const firebase = require('firebase')
const { admin, db } = require('../../util/admin')

const firebaseConfig = require('../../config').firebaseConfig
const {
  validateSignUpData,
  validateLoginData,
  validateUpdateUserDetails,
} = require('../../util/validator')

firebase.initializeApp(firebaseConfig)

// Signup
exports.signUp = async (req, res, next) => {
  const { error } = validateSignUpData(req.body)

  if (error) return next(error)

  const { email, username, password } = req.body

  try {
    const userRef = db.doc(`/users/${username}`)
    const userSnapshot = await userRef.get()

    if (userSnapshot.exists) {
      return res.status(400).json({ username: `${username} is already taken` })
    }

    const userAuth = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)

    if (!userAuth) return

    const userId = userAuth.user.uid
    const token = await userAuth.user.getIdToken()
    const noImg = 'no-img.webp'

    const userCredentials = {
      userId,
      email,
      username,
      imageUrl: `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${noImg}?alt=media`,
      createdAt: new Date().toISOString(),
    }

    await userRef.set(userCredentials)

    return res.status(201).json({ token })
  } catch (err) {
    if (err.code === 'auth/email-already-in-use') {
      return res.status(400).json({ email: 'Email already exists' })
    }

    next(err)
  }
}

// Login
exports.login = async (req, res, next) => {
  const { error } = validateLoginData(req.body)

  if (error) return next(error)

  const { email, password } = req.body

  try {
    const userAuth = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)

    if (!userAuth) return

    const token = await userAuth.user.getIdToken()

    return res.status(200).json({ token })
  } catch (err) {
    next(err)
  }
}

// Upload Profile Image
exports.uploadImage = (req, res, next) => {
  const BusBoy = require('busboy')
  const path = require('path')
  const os = require('os')
  const fs = require('fs')

  const busboy = new BusBoy({ headers: req.headers })

  let imgFilename
  let imgToBeUploaded = {}

  busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
    if (mimetype !== 'image/jpeg' && mimetype !== 'image/png') {
      return res
        .status(400)
        .json({ errors: { message: 'Wrong file type submitted' } })
    }
    // my.image.png
    const splitFilename = filename.split('.')
    const imgExt = splitFilename[splitFilename.length - 1]
    const imgFilename = `${Math.round(Math.random() * 100000000000)}.${imgExt}`
    const filePath = path.join(os.tmpdir(), imgFilename)
    imgToBeUploaded = { filePath, mimetype }
    file.pipe(fs.createWriteStream(filePath))
  })

  busboy.on('finish', async () => {
    try {
      await admin
        .storage()
        .bucket()
        .upload(imgToBeUploaded.filePath, {
          resumable: false,
          metadata: {
            metadata: {
              contentType: imgToBeUploaded.mimetype,
            },
          },
        })

      const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${imgFilename}?alt=media`
      await db.doc(`/users/${req.user.username}`).update({ imageUrl })

      return res.json({ message: `Image uploaded successfully` })
    } catch (err) {
      next(err)
    }
  })
  busboy.end(req.rawBody)
}

// Update User Details
exports.updateUserDetails = async (req, res, next) => {
  const userDetails = validateUpdateUserDetails(req.body)

  try {
    await db.doc(`/users/${req.user.username}`).update(userDetails)

    return res.json({ message: 'Details updated successfully' })
  } catch (err) {
    next(err)
  }
}

// Get user details
exports.getUserDetails = async (req, res, next) => {
  let userData = {}

  try {
    const userSnapshot = await db.doc(`/users/${req.user.username}`).get()

    if (!userSnapshot.exists) return res.sendStatus(401)

    userData.credentials = userSnapshot.data()

    const likesSnapshot = await db
      .collection('likes')
      .where('username', '==', req.user.username)
      .get()

    userData.likes = []
    likesSnapshot.forEach((doc) => {
      userData.likes.push(doc.data())
    })

    return res.json(userData)
  } catch (err) {
    next(err)
  }
}

const firebase = require('firebase')
const { db } = require('../../util/admin')

const firebaseConfig = require('../../config').firebaseConfig
const {
  validateSignUpData,
  validateLoginData,
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

    const userCredentials = {
      userId,
      email,
      username,
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

exports.updateUser = () => {}

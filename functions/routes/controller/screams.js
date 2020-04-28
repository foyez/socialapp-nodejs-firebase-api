const { db } = require('../../util/admin')

exports.getScreams = async (req, res, next) => {
  try {
    const docSnapshot = await db
      .collection('screams')
      .orderBy('createdAt', 'desc')
      .get()
    let screams = []
    docSnapshot.forEach((doc) => {
      screams.push({ id: doc.id, ...doc.data() })
    })
    return res.json(screams)
  } catch (err) {
    console.log(err)
    next(err)
  }
}

exports.createScream = async (req, res, next) => {
  const { body, username } = req.body
  const newScream = {
    username,
    body,
    createdAt: new Date().toISOString(),
  }

  try {
    const screamRef = await db.collection('screams').add(newScream)
    newScream.id = screamRef.id

    return res.status(201).json(newScream)
  } catch (err) {
    next(err)
  }
}

// Get a scream
exports.getScream = async (req, res, next) => {
  try {
    const screamSnapshot = await db.doc(`/screams/${req.params.screamId}`).get()

    if (!screamSnapshot.exists) return res.sendStatus(404)

    const screamData = screamSnapshot.data()
    screamData.screamId = screamSnapshot.id

    const commentsSnapshot = await db
      .collection('comments')
      .orderBy('createdAt', 'desc')
      .where('screamId', '==', req.params.screamId)
      .get()

    if (commentsSnapshot.empty) return res.sendStatus(404)

    screamData.comments = []
    commentsSnapshot.forEach((doc) => {
      screamData.comments.push(doc.data())
    })

    return res.json(screamData)
  } catch (err) {
    next(err)
  }
}

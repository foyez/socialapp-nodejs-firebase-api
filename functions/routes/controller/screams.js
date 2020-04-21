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

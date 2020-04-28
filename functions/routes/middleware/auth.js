const { db, admin } = require('../../util/admin')

const getTokenFromHeader = (req) => {
  if (
    (req.headers.authorization &&
      req.headers.authorization.split(' ')[0] === 'Bearer') ||
    (req.headers.authorization &&
      req.headers.authorization.split(' ')[0] === 'Token')
  ) {
    return req.headers.authorization.split(' ')[1]
  }

  return null
}

const jwt = (properties) => async (req, res, next) => {
  const { getToken, credentialsRequired, userProperty } = properties
  const token = getToken(req)

  if (token) {
    try {
      const decodedToken = await admin.auth().verifyIdToken(token)
      req[userProperty] = decodedToken

      const userSnapshot = await db
        .collection('users')
        .where('userId', '==', req[userProperty].uid)
        .limit(1)
        .get()

      req[userProperty].username = userSnapshot.docs[0].data().username
      req[userProperty].imageUrl = userSnapshot.docs[0].data().imageUrl

      // console.log(req[userProperty])
      return next()
    } catch (err) {
      err.status = 401

      if (credentialsRequired) return next(err)
      else if (!credentialsRequired) return next()
    }
  } else if (!credentialsRequired && !token) {
    return next()
  } else {
    const err = {}
    err.status = 401
    return next(err)
  }
}

const auth = {
  required: jwt({
    getToken: getTokenFromHeader,
    userProperty: 'user',
    credentialsRequired: true,
  }),
  optional: jwt({
    getToken: getTokenFromHeader,
    userProperty: 'user',
    credentialsRequired: false,
  }),
}

module.exports = auth

const functions = require('firebase-functions')
const app = require('express')()
require('./loaders/express')(app)

// exports.api = functions.region('europe-west1').https.onRequest(app)
exports.api = functions.https.onRequest(app)

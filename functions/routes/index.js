const router = require('express').Router()
// const api = require('../config').api

// router.use(api.prefix, require('./api'))
router.use(require('./api'))

module.exports = router

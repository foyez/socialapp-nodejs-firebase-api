const router = require('express').Router()

router.use('/', require('./users'))
router.use('/screams', require('./screams'))

module.exports = router

const router = require('express').Router()

const auth = require('../middleware/auth')

const screamsController = require('../controller/screams')

/**
 * @route   GET api/screams
 * @desc    Get screams
 * @access  Public
 */
router.get('/', screamsController.getScreams)

/**
 * @route   POST api/screams
 * @desc    Create a scream
 * @access  Public
 */
router.post('/', auth.required, screamsController.createScream)

module.exports = router

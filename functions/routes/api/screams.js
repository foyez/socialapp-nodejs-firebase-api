const router = require('express').Router()

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
router.post('/', screamsController.createScream)

module.exports = router

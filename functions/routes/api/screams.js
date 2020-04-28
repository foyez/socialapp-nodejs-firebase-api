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

/**
 * @route   GET api/screams/:screamId
 * @desc    Get a scream
 * @access  Public
 */
router.get('/:screamId', screamsController.getScream)

/**
 * @route   DELETE api/screams/:screamId
 * @desc    Delete a scream
 * @access  Private
 */
router.delete('/:screamId', auth.required, screamsController.deleteScream)

/**
 * @route   POST api/screams/:screamId/comment
 * @desc    Create a comment
 * @access  Private
 */
router.post(
  '/:screamId/comment',
  auth.required,
  screamsController.createComment,
)

/**
 * @route   GET api/screams/:screamId/like
 * @desc    like a scream
 * @access  Private
 */
router.get('/:screamId/like', auth.required, screamsController.likeScream)

/**
 * @route   GET api/screams/:screamId/unlike
 * @desc    Unlike a scream
 * @access  Private
 */
router.get('/:screamId/unlike', auth.required, screamsController.unlikeScream)

module.exports = router

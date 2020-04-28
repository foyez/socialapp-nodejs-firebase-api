const router = require('express').Router()

const usersController = require('../controller/users')
const authMiddleware = require('../middleware/auth')

/**
 * @route   POST api/users
 * @desc    Create a user
 * @access  Public
 */
router.post('/users', usersController.signUp)

/**
 * @route   POST api/users/login
 * @desc    login
 * @access  Public
 */
router.post('/users/login', usersController.login)

/**
 * @route   POST api/user/image
 * @desc    upload profile image
 * @access  Private
 */
router.post('/user/image', authMiddleware.required, usersController.uploadImage)

/**
 * @route   PUT api/user
 * @desc    Update user
 * @access  Private
 */
router.put('/user', authMiddleware.required, usersController.updateUserDetails)

/**
 * @route   GET api/user
 * @desc    Get a user
 * @access  Private
 */
router.get('/user', authMiddleware.required, usersController.getUserDetails)

module.exports = router

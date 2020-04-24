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
router.post('/user', usersController.updateUser)

module.exports = router

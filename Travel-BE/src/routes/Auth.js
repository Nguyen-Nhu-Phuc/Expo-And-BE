const AuthController = require('../app/controllers/Auth.controller')

const express = require('express')
const router = express.Router()

router.post('/SignUp', AuthController.signUp)
router.post('/SignIn', AuthController.signIn)
router.get('/getAllUser', AuthController.getAllUsers)

module.exports = router

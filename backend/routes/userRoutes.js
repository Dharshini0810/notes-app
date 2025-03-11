const express = require('express')
const { userSignUp, userLogin, currentUser } = require('../controllers/userController')
const { validateToken } = require('../middleware/validateTokenHandler')
const router = express.Router()

router.route('/signup').post(userSignUp)

router.route('/login').post(userLogin)

router.route('/current').get(validateToken,currentUser)

module.exports = router;

const router = require('express').Router()
const User = require('../models/User-model')
const { loginValidation } = require('../auth/validation')
const verify = require('../auth/verifyToken')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const loginController = require('../controllers/login-controller')

// get login page
router.get('/login', loginController.getLogin)
router.post('/login', loginController.postLogin)

// // login a user
// router.post('/login', async (req, res, next) => {
// 	// validate a returning user
// 	const { error } = loginValidation(req.body)
// 	if (error) {
// 		return res.status(400).send(error.details[0].message)
// 	}
// 	// check if email exists
// 	let user = await User.findOne({ email: req.body.email })
// 	if (!user) {
// 		return res.status(400).render('error', {
// 			title: 'Error',
// 			error: `No user found with this email: ${req.body.email}`,
// 		})
// 	}
// 	// check if password is correct
// 	let validPassword = await bcrypt.compare(req.body.password, user.password)
// 	if (!validPassword) {
// 		return res.status(400).render('error', { title: 'Error', error: 'Incorrect password' })
// 	}
// 	if (!error || user || validPassword) {
// 		// create and assign JWT to user
// 		const token = jwt.sign({ _id: user._id, email: user.email }, process.env.TOKEN_SECRET)
// 		req.session()
// 		// res.header('auth-token', token).then((user) => redirect('/my-entries'))
// 		// render('homepage', { title: 'My Journal', user })

// 	}
// 	next()
// })

module.exports = router

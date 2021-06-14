const router = require('express').Router()
const User = require('../models/User-model')
const { registerValidation } = require('../auth/validation')
const bcrypt = require('bcryptjs')

const registerController = require('../controllers/register-controller')

// get registration page
router.get('/register', registerController.registerUser)

// // register a user
// router.post('/register', async (req, res, next) => {
// 	// validate new user data
// 	const { error } = registerValidation(req.body)
// 	if (error) {
// 		return res.status(400).send(error.details[0].message)
// 	}
// 	// check if user already exists
// 	let _user = await User.findOne({ email: req.body.email })
// 	if (_user) {
// 		return res.status(400).send(`User with email: ${req.body.email} already exists`)
// 	}
// 	// create a new user if no errors
// 	if (!error || !_user) {
// 		// hash password
// 		const salt = await bcrypt.genSalt(10)
// 		const hashPassword = await bcrypt.hash(req.body.password, salt)
// 		const newUser = new User({
// 			name: req.body.name,
// 			email: req.body.email,
// 			password: hashPassword,
// 		})
// 		try {
// 			await newUser.save().then((newUser) => res.status(200).redirect('/login'))
// 		} catch (err) {
// 			console.log({ message: err.message })
// 		}
// 	}
// 	next()
// })

module.exports = router

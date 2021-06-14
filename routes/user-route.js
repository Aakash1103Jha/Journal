const router = require('express').Router()
const User = require('../models/User-model')
const { registerValidation, loginValidation } = require('../auth/validation')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

// get login page
router.get('/login', async (req, res, next) => {
	res.render('login', { title: 'Login' })
})

// login a user
router.post('/login', async (req, res, next) => {
	// validate a returning user
	const { error } = loginValidation(req.body)
	if (error) {
		return res.status(400).send(error.details[0].message)
	}
	// check if email exists
	let user = await User.findOne({ email: req.body.email })
	if (!user) {
		return res.status(400).send(`No user found with this email: ${req.body.email}`)
	}
	// check if password is correct
	let validPassword = await bcrypt.compare(req.body.password, user.password)
	if (!validPassword) {
		return res.status(400).send('Incorrect password :(')
	}
	if (!error || user || validPassword) {
		// create and assign JWT to user
		const token = jwt.sign({ _id: user._id, email: user.email }, process.env.TOKEN_SECRET)
		res.header('auth-token', token).render('homepage', { title: 'Homepage', path: '/homepage' })
	}
	next()
})

// get registration page
router.get('/register', async (req, res, next) => {
	res.render('register', { title: 'Register' })
})

// register a user
router.post('/register', async (req, res, next) => {
	// validate new user data
	const { error } = registerValidation(req.body)
	if (error) {
		return res.status(400).send(error.details[0].message)
	}
	// check if user already exists
	let _user = await User.findOne({ email: req.body.email })
	if (_user) {
		return res.status(400).send(`User with email: ${req.body.email} already exists`)
	}
	// create a new user if no errors
	if (!error || !_user) {
		// hash password
		const salt = await bcrypt.genSalt(10)
		const hashPassword = await bcrypt.hash(req.body.password, salt)
		const newUser = new User({
			name: req.body.name,
			email: req.body.email,
			password: hashPassword,
		})
		try {
			await newUser.save().then(res.status(200).render('login', { title: 'Login' }))
		} catch (err) {
			console.log({ message: err.message })
		}
	}
})

module.exports = router

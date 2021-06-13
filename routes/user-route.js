const router = require('express').Router()
const User = require('../models/User-model')

// login a user
router.get('/login', async (req, res, next) => {
	res.render('login', { title: 'Login' })
})

router.get('/register', async (req, res, next) => {
	res.render('register', { title: 'Register' })
})

// register a user
router.post('/new-user', async (req, res, next) => {
	const user = new User({
		name: req.body.name,
		username: req.body.username,
		password: req.body.password,
	})
	try {
		await user.save().then(res.render('login', { title: 'Login' }))
	} catch (err) {
		console.log({ message: err.message })
	}
})

module.exports = router

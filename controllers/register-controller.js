exports.registerUser = async (req, res, next) => {
	res.render('register', {
		path: '/register',
		title: 'Register',
	})
}

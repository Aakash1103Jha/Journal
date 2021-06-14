exports.getLogin = async (req, res, next) => {
	const isLoggedIn = req.get('Cookie').split('=')[1]
	res.render('login', {
		path: '/login',
		title: 'Login',
		isLoggedIn,
	})
}
exports.postLogin = async (req, res, next) => {
	res.setHeader('Set-Cookie', 'loggedIn = true')
	res.redirect('/my-entries')
}

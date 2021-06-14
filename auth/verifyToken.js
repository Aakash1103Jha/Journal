const jwt = require('jsonwebtoken')

module.exports = async function auth(req, res, next) {
	const token = await req.header('auth-token')
	if (!token) {
		return res.status(401).render('error', { title: 'Error 404', error: 'Access denied' })
	}
	try {
		const verified = jwt.verify(token, process.env.TOKEN_SECRET) //gives the _id of the user
		req.user = verified
		next()
	} catch {
		res.status(400).send('Invalid token')
	}
}

const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const mongoose = require('mongoose')

require('dotenv').config()

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})

mongoose.connect(process.env.ATLAS_URI, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
	console.log('MongoDB Atlas connected :)')
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'public', 'views', 'templates'))

// route imports
const JournalRoute = require('./routes/homepage-route')
const LoginRoute = require('./routes/login-route')
const RegisterRoute = require('./routes/register-route')

// route middlewares
app.get('/', async (req, res, next) => {
	res.render('landing-page', { title: 'Journal.IO' })
	next()
})
app.use('/', JournalRoute)
app.use('/', LoginRoute)
app.use('/', RegisterRoute)

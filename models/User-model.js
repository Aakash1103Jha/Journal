const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserModel = new Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
		min: 8,
	},
	date: {
		type: Date,
		default: Date.now,
	},
})

module.exports = mongoose.model('Users', UserModel)

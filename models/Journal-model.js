const mongoose = require('mongoose')
const Schema = mongoose.Schema

const JournalModel = new Schema({
	title: {
		type: String,
		required: true,
	},
	content: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
})

module.exports = mongoose.model('Journal Entries', JournalModel)

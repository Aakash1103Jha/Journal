const Journal = require('../models/Journal-model')

exports.getAllEntries = async (req, res, next) => {
	try {
		let allEntries = await Journal.findOne(req.user)
		res.render('homepage', {
			allEntries,
			title: 'My Journal',
			path: '/my-entries',
		})
	} catch (err) {
		res.json({ message: err.message })
	}
}

exports.getOneEntry = async (req, res, next) => {
	try {
		let oneEntry = await Journal.findById({ _id: req.params.id })
		res.json(oneEntry)
	} catch (err) {
		res.json({ message: err.message })
	}
}
exports.postOneEntry = async (req, res, next) => {
	const entry = new Journal({
		title: req.body.title,
		content: req.body.content,
		date: req.body.date,
	})
	try {
		let newEntry = await entry.save()
		res.json(newEntry)
	} catch (err) {
		res.json({ message: err.message })
	}
}
exports.modifyOneEntry = async (req, res, next) => {
	try {
		await Journal.findByIdAndUpdate(
			{ _id: req.params.id },
			{
				$set: {
					content: req.body.content,
				},
			},
			{ upsert: false }
		).then((item) => res.json(req.body))
	} catch (err) {
		res.json({ message: err.message })
	}
}

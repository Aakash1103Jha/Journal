const router = require('express').Router()
const Journal = require('../models/Journal-model')
const verify = require('../auth/verifyToken')

// find all entries
router.get('/my-entries', verify, async (req, res) => {
	try {
		let allEntries = await Journal.find()
		res.render('homepage', {
			allEntries,
			title: 'My Journal',
			path: '/my-entries',
		})
	} catch (err) {
		res.json({ message: err.message })
	}
})

// find one entry by _id
router.get('/one-entry/:id', verify, async (req, res) => {
	try {
		let oneEntry = await Journal.findById({ _id: req.params.id })
		res.json(oneEntry)
	} catch (err) {
		res.json({ message: err.message })
	}
})

// add new entry
router.post('/new-entry', verify, async (req, res) => {
	const entry = new Journal({
		title: req.body.title,
		content: req.body.content,
		date: req.body.date,
	})
	try {
		let newEntry = await entry.save().then((item) => res.json(newEntry))
	} catch (err) {
		res.json({ message: err.message })
	}
})

// find entry by _id and modify entry content
router.put('/modify-entry/:id', verify, async (req, res) => {
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
})

module.exports = router

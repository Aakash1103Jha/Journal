const router = require('express').Router()

const homepageController = require('../controllers/homepage-controller')

// find all entries
router.get('/my-entries', homepageController.getAllEntries)

// find one entry by _id
router.get('/one-entry/:id', homepageController.getOneEntry)

// add new entry
router.post('/new-entry', homepageController.postOneEntry)

// find entry by _id and modify entry content
router.put('/modify-entry/:id', homepageController.modifyOneEntry)

module.exports = router

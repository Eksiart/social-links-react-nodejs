const express = require('express')
const router = express.Router()

const profileController = require('../controllers/profile');
const profileValidator = require('../validators/profileValidator')

router.get('/', profileController.getOwner);
router.get('/change', profileValidator.changeProfile, profileController.changeProfile);
router.get('/change/delete-provider', profileValidator.deleteProvider, profileController.deleteProvider);

module.exports = router
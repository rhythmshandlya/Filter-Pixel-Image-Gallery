const express = require('express');
const { protect } = require('../controllers/authController');
const driveController = require('../controllers/driveController');

const router = express.Router();

router.route('/').get(protect, driveController.getAllImages);

module.exports = router;

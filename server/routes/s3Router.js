const express = require('express');
const { protect } = require('../controllers/authController');
const s3Controller = require('../controllers/s3Controller');

const router = express.Router();

router.route('/').get(s3Controller.getAllImages);

module.exports = router;

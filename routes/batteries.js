const express = require('express');
const router = express.Router();
const batteriesController = require('../controllers/batteries');

router.post('/batteries', batteriesController.createBattery);

module.exports = router;
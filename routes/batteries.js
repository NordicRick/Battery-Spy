const express = require('express');
const router = express.Router();
const batteriesController = require('../controllers/batteries');

router.post('/batteries', batteriesController.createBattery);
router.get('/batteries', batteriesController.getBatteries); 
router.get('/batteries/:id', batteriesController.getBatteryById);
router.put('/batteries/:id', batteriesController.updateBattery);
router.delete('/batteries/:id', batteriesController.deleteBattery);

module.exports = router;
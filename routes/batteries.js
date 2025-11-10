const express = require('express');
const router = express.Router();
const batteriesController = require('../controllers/batteries');

router.post('/batteries', batteriesController.createBattery);
router.get('/batteries', batteriesController.getBatteries); 
router.get('/batteries/:serialNumber', batteriesController.getBatteryBySerialNumber);
router.put('/batteries/:serialNumber', batteriesController.updateBattery);
router.delete('/batteries/:serialNumber', batteriesController.deleteBattery);

module.exports = router;
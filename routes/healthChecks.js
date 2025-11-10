const express = require('express');
const router = express.Router();
const healthChecksController = require('../controllers/healthChecks');

// routes call function from controller  , Route > Controller > Service > Model > Database  

router.post('/checks', healthChecksController.createHealthCheck);
router.get('/checks', healthChecksController.getHealthChecks);
//router.get('/healthChecks/:id', healthChecksController.getHealthCheckById);
//router.put('/healthChecks/:id', healthChecksController.updateHealthCheck);
//router.delete('/healthChecks/:id', healthChecksController.deleteHealthCheck);

module.exports = router;
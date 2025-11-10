const healthCheckModel = require('../models/Health_Checks'); 
const dotenv = require('dotenv'); 
dotenv.config(); 

// health check service function using model for database interaction

const createHealthCheck = async (healthCheckData) => {
    try {
        const healthCheck = await healthCheckModel.create(healthCheckData);
        return healthCheck.get({ plain: true });
    } catch (error) {
        console.error('Error creating health check:', error.message);
        throw error;
    }
};

const getHealthChecks = async () => { 
    try {
        const healthChecks = await healthCheckModel.findAll({ 
            raw: true,
            attributes: ['id', 'internal_resistance', 'check_date', 'user_id', 'battery_serial_number', 'notes']
        });
        return healthChecks;
    } catch (error) {
        console.error('Error fetching health checks:', error.message);
        throw error;
    }
};

module.exports = {
    createHealthCheck,
    getHealthChecks,
    // getHealthCheckById, // not needed yet 
    // updateHealthCheck, // not needed yet 
    // deleteHealthCheck, // not needed yet 
};
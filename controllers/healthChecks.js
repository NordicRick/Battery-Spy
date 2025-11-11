// controller takes the request, validates the data using Joi schema
//  and uses the service functions to interact with the database

const { JoiHealthCheckSchema } = require('../validation/JSON_Validate.js');
const healthService = require('../services/healthService.js'); 

// health check controller function using Joi schema and service function for database interaction

const createHealthCheck = async (req, res) => {
    try {
        const { error, value } = JoiHealthCheckSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ 
                success: false,
                message: 'Validation error',
                errors: error.details.map(detail => ({
                    field: detail.path.join('.'),
                    message: detail.message
                }))
            });
        }

        const healthCheck = await healthService.createHealthCheck(value);
        return res.status(201).json({
            success: true,
            message: 'Health check created successfully',
            data: healthCheck
        });
    } catch (error) {
        console.error('Error creating health check:', error.message);
        return res.status(500).json({
            success: false,
            message: 'server error creating health check',
            error: error.message,
        });
    }
};

const getHealthChecks = async (req, res) => {
    try {
        const healthChecks = await healthService.getHealthChecks();
        return res.status(200).json({
            success: true,
            message: 'Health checks fetched successfully',
            data: healthChecks
        });
    } catch (error) {
        console.error('Error fetching health checks:', error.message);
        return res.status(500).json({
            success: false,
            message: 'server error fetching health checks',
        });
    }
};

const getHealthCheckBySerialNumber = async (req, res) => {
    try {
        const { serialNumber } = req.params;
        const healthCheck = await healthService.getHealthCheckBySerialNumber(serialNumber);
        
        if (!healthCheck) {
            return res.status(404).json({
                success: false,
                message: 'Health check not found for this battery serial number',
            });
        }
        
        return res.status(200).json({
            success: true,
            message: 'Health check fetched successfully',
            data: healthCheck
        });

    } catch (error) {
        console.error('Error fetching health check by serial number:', error.message);
        return res.status(500).json({
            success: false,
            message: 'server error fetching health check by serial number',
        });
    }
};
module.exports = {
    createHealthCheck,
    getHealthChecks,
    getHealthCheckBySerialNumber,
};
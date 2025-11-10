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
        
        // Handle foreign key constraint errors
        if (error.name === 'SequelizeForeignKeyConstraintError' || error.parent?.code === 'ER_NO_REFERENCED_ROW_2') {
            if (error.message.includes('user_id') || error.parent?.sqlMessage?.includes('user_id')) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid user_id: User does not exist',
                });
            }
            if (error.message.includes('battery_serial_number') || error.parent?.sqlMessage?.includes('battery_serial_number')) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid battery_serial_number: Battery does not exist',
                });
            }
            return res.status(400).json({
                success: false,
                message: 'Foreign key constraint error: Referenced record does not exist',
            });
        }
        
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

module.exports = {
    createHealthCheck,
    getHealthChecks,
};
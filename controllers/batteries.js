// controller takes the request, validates the data using Joi schema
//  and uses the service functions to interact with the database

const JoiBatterySchema = require('../validation/JSON_Validate.js'); 
const batteryService = require('../services/batteryService.js'); 

const createBattery = async (req, res) => {
    try {
        // validate the request body using the Joi schema
        const { error, value } = JoiBatterySchema.validate(req.body);
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

        // create the battery using the service function
        const battery = await batteryService.createBattery(value);
        return res.status(201).json({
            success: true,
            message: 'Battery created successfully',
            data: battery
        });

    } catch (error) {
        if (error.name === 'SequalizeUniqueConstraintError') {
            return res.status(400).json({
                success: false,
                message: 'Battery with this serial number already exists',
            });
        }
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

module.exports = {
    createBattery,
}
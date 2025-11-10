// controller takes the request, validates the data using Joi schema
//  and uses the service functions to interact with the database

const JoiBatterySchema = require('../validation/JSON_Validate.js'); 
const batteryService = require('../services/batteryService.js'); 

// create battery controller function

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
        console.error('Error creating battery:', error.message);
        return res.status(500).json({
            success: false,
            message: 'server error creating battery',
        });
    }
};

// get all batteries controller function

const getBatteries = async (req, res) => {  
    try {
        const batteries = await batteryService.getBatteries();
        return res.status(200).json({
            success: true,
            message: 'Batteries fetched successfully',
            data: batteries
        });
    }
    catch (error) {
        console.error('Error fetching batteries:', error.message);
        return res.status(500).json({
            success: false,
            message: 'server error fetching batteries',
        });
    }
};

// get battery by id controller function

const getBatteryById = async (req, res) => {
    try {
        const { id } = req.params;
        const battery = await batteryService.getBatteryById(id);
        
        if (!battery) {
            return res.status(404).json({
                success: false,
                message: 'Battery not found please check the id',
            });
        }
        
        return res.status(200).json({
            success: true,
            message: 'Battery fetched successfully',
            data: battery
        });
    }
    catch (error) {
        console.error('Error fetching battery by id:', error.message);
        return res.status(500).json({
            success: false,
            message: 'server error fetching battery by id',
        });
    }
};

// update battery controller function

const updateBattery = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Validate the request body using the Joi schema
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

        const battery = await batteryService.updateBattery(id, value);
        
        if (!battery) {
            return res.status(404).json({
                success: false,
                message: 'Battery not found please check the id',
            });
        }
        
        return res.status(200).json({
            success: true,
            message: 'Battery updated successfully',
            data: battery
        });
    }
    catch (error) {
        console.error('Error updating battery:', error.message);
        return res.status(500).json({
            success: false,
            message: 'server error updating battery',
        });
    }
};  

// delete battery controller function

const deleteBattery = async (req, res) => {
    try {
        const { id } = req.params;
        const battery = await batteryService.deleteBattery(id);
        
        if (!battery) {
            return res.status(404).json({
                success: false,
                message: 'Battery not found please check the id',
            });
        }
        
        return res.status(200).json({
            success: true,
            message: 'Battery deleted successfully',
            data: battery
        });
    }
    catch (error) {
        console.error('Error deleting battery:', error.message);
        return res.status(500).json({
            success: false,
            message: 'server error deleting battery',
        });
    }
};

module.exports = {
    createBattery,
    getBatteries,
    getBatteryById,
    updateBattery,
    deleteBattery
}
const batteryModel = require('../models/Batteries');
const dotenv = require('dotenv');
dotenv.config();

const createBattery = async (batteryData) => {
    try {
        const battery = await batteryModel.create(batteryData);
        console.log('Battery created successfully', battery);
        return battery;
    } catch (error) {
        console.error('Error creating battery', error);
        throw error;
    }
};

module.exports = {
    createBattery,
};


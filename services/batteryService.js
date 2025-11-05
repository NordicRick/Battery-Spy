const batteryModel = require('../models/Batteries');
const dotenv = require('dotenv');
dotenv.config();

const createBattery = async (batteryData) => {
    try {
        const battery = await batteryModel.create(batteryData);
        return battery.get({ plain: true });
    } catch (error) {
        console.error('Error creating battery:', error.message);
        throw error;
    }
};

const getBatteries = async () => {
    try {
        const batteries = await batteryModel.findAll({ raw: true });
        return batteries;
    } catch (error) {
        console.error('Error fetching batteries:', error.message);
        throw error;
    }
};

const getBatteryById = async (id) => {
    try {
        const battery = await batteryModel.findByPk(id, { raw: true });
        return battery;
    } catch (error) {
        console.error('Error fetching battery by id:', error.message);
        throw error;
    }
};

const updateBattery = async (id, batteryData) => {
    try {
        const battery = await batteryModel.findByPk(id);
        if (!battery) {
            return null;
        }
        await battery.update(batteryData);
        return battery.get({ plain: true });
    } catch (error) {
        console.error('Error updating battery:', error.message);
        throw error;
    }
};


module.exports = {
    createBattery,
    getBatteries,
    getBatteryById,
    updateBattery
};


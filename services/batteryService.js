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
        const batteries = await batteryModel.findAll({ 
            raw: true,
            attributes: ['serial_number', 'platform_model', 'capacity', 'purchase_date', 'battery_status', 'notes']
        });
        return batteries;
    } catch (error) {
        console.error('Error fetching batteries:', error.message);
        throw error;
    }
};

const getBatteryBySerialNumber = async (serialNumber) => {
    try {
        const battery = await batteryModel.findByPk(serialNumber, { 
            raw: true,
            attributes: ['serial_number', 'platform_model', 'capacity', 'purchase_date', 'battery_status', 'notes']
        });
        return battery;
    } catch (error) {
        console.error('Error fetching battery by serial number:', error.message);
        throw error;
    }
};

const updateBattery = async (serialNumber, batteryData) => {
    try {
        const battery = await batteryModel.findByPk(serialNumber);
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

const deleteBattery = async (serialNumber) => {
    try {
        const battery = await batteryModel.findByPk(serialNumber);
        if (!battery) {
            return null;
        }
        const batteryData = battery.get({ plain: true });
        await battery.destroy();
        return batteryData;
    } catch (error) {
        console.error('Error deleting battery:', error.message);
        throw error;
    }
};


module.exports = {
    createBattery,
    getBatteries,
    getBatteryBySerialNumber,
    updateBattery,
    deleteBattery
};


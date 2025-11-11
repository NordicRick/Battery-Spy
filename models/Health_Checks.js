// load modules and files 
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const HealthCheck = sequelize.define('HealthCheck', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    battery_serial_number: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_name: {
        type: DataTypes.STRING, 
        allowNull: false,
    },
    check_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    internal_resistance: {
        type: DataTypes.DECIMAL(5, 2), // 5 total digits, 2 decimal places (allows 0.00 to 999.99)
        allowNull: false,
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    
}, {
    timestamps: false,
});

module.exports = HealthCheck;
// load modules and files 
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Battery = sequelize.define('Battery', {
    serial_number: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    platform_model: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    purchase_date: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    battery_status: {
        type: DataTypes.ENUM('active', 'warning', 'retired'),
        defaultValue: 'active',
        allowNull: false,
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    
}, {
    timestamps: false,
});

module.exports = Battery;
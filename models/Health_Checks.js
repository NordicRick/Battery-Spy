// load modules and files 
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const HealthCheck = sequelize.define('HealthCheck', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    battery_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    check_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    internal_resistance: {
        type: DataTypes.DECIMAL(2, 2), // 2 decimal places
        allowNull: false,
    },
    
}, {
    timestamps: false,
});

module.exports = HealthCheck;
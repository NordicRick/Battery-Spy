// load modules and files 
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Status = sequelize.define('Status', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    battery_serial_number: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('active', 'warning', 'retired'),
        defaultValue: 'active',
        allowNull: false,
    },
    change_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    change_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    timestamps: false,
});

module.exports = Status;
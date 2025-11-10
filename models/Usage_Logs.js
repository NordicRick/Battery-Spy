// load modules and files 
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UsageLog = sequelize.define('UsageLog', {
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
    usage_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    cycles: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}); 

module.exports = UsageLog;
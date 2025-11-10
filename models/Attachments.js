// load modules and files 
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Attachment = sequelize.define('Attachment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    battery_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    uploaded_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    uploaded_at: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    file_path: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    
});

module.exports = Attachment;
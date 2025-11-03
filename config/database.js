// load modules 
const { Sequelize } = require('sequelize');
require('dotenv').config();

const dialect = process.env.DB_DIALECT || 'mysql';
const port = process.env.DB_PORT 

// initialize new instance
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port,
        dialect
    }
);

// test function 
async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('DB connection established');
    } catch (error) {
        console.log('Unable to connect to DB', error);
    }
}

testConnection();

module.exports = sequelize;
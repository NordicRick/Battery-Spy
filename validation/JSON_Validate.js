//Joi is a library for validating JSON data
// the final top level battery object schema 

const Joi = require('joi');

const JoiBatterySchema = Joi.object({ // change PK ref 
    serial_number: Joi.string().required(),
    platform_model: Joi.string().required(),
    capacity: Joi.number().required(),
    purchase_date: Joi.date().required(),
    battery_status: Joi.string().required(),
    notes: Joi.string().optional(),
});


// add other models here .... 

module.exports = JoiBatterySchema;
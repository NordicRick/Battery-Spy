//Joi is a library for validating JSON data
// the final top level battery object schema 

const Joi = require('joi');

const JoiBatterySchema = Joi.object({ 
    serial_number: Joi.string().required().regex(/^\S+$/).messages({
        'string.pattern.base': 'Serial number cannot contain whitespace'
    }),
    platform_model: Joi.string().required(),
    capacity: Joi.number().required(),
    purchase_date: Joi.date().required(),
    battery_status: Joi.string().required(),
    notes: Joi.string().optional(),
});

const JoiHealthCheckSchema = Joi.object({
    internal_resistance: Joi.number().min(0).max(999.99).required(),
    check_date: Joi.date().required(),
    battery_serial_number: Joi.string().required().regex(/^\S+$/).messages({
        'string.pattern.base': 'Serial number cannot contain whitespace'
    }), // serial number is the foreign key to the battery table
    user_name: Joi.string().required(),
    notes: Joi.string().optional(),
});

const JoiStatusSchema = Joi.object({
    status: Joi.string().required(),
    change_date: Joi.date().required(),
    user_name: Joi.string().required(), 
    battery_serial_number: Joi.string().required().regex(/^\S+$/).messages({
        'string.pattern.base': 'Serial number cannot contain whitespace'
    }),
    notes: Joi.string().optional(),
});

const JoiUsageLogSchema = Joi.object({
    cycles: Joi.number().required(),
    usage_date: Joi.date().required(),
    user_name: Joi.string().required(),
    battery_serial_number: Joi.string().required().regex(/^\S+$/).messages({
        'string.pattern.base': 'Serial number cannot contain whitespace'
    }),
    notes: Joi.string().optional(),
});


const JoiAttachmentSchema = Joi.object({
    file_name: Joi.string().required(),
    file_path: Joi.string().required(),
    file_type: Joi.string().required(),
    file_size: Joi.number().required(),
    battery_serial_number: Joi.string().required().regex(/^\S+$/).messages({
        'string.pattern.base': 'Serial number cannot contain whitespace'
    }),
    user_name: Joi.string().required(),
});


module.exports = { 
    JoiBatterySchema, 
    JoiHealthCheckSchema, 
    JoiStatusSchema, 
    JoiUsageLogSchema, 
    JoiAttachmentSchema 
};
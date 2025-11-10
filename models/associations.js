const Battery = require('./Batteries');
const HealthCheck = require('./Health_Checks');
const UsageLog = require('./Usage_Logs');
const Attachment = require('./Attachments');
const User = require('./Users');
const Status = require('./Status');

const defineAssociations = () => {
    // Battery associations
    Battery.hasMany(HealthCheck, { foreignKey: 'battery_serial_number', sourceKey: 'serial_number' });
    Battery.hasMany(UsageLog, { foreignKey: 'battery_serial_number', sourceKey: 'serial_number' });
    Battery.hasMany(Attachment, { foreignKey: 'battery_serial_number', sourceKey: 'serial_number' });
    Battery.hasMany(Status, { foreignKey: 'battery_serial_number', sourceKey: 'serial_number' });
    
    // BelongsTo associations
    HealthCheck.belongsTo(Battery, { foreignKey: 'battery_serial_number', targetKey: 'serial_number' });
    UsageLog.belongsTo(Battery, { foreignKey: 'battery_serial_number', targetKey: 'serial_number' });
    Attachment.belongsTo(Battery, { foreignKey: 'battery_serial_number', targetKey: 'serial_number' });
    Status.belongsTo(Battery, { foreignKey: 'battery_serial_number', targetKey: 'serial_number' });
    
    // User associations
    //User.hasMany(Battery, { foreignKey: 'user_id' });
    User.hasMany(HealthCheck, { foreignKey: 'user_id' });
    User.hasMany(UsageLog, { foreignKey: 'user_id' });
    User.hasMany(Status, { foreignKey: 'user_id' });
    User.hasMany(Attachment, { foreignKey: 'user_id' });
}

module.exports = defineAssociations;








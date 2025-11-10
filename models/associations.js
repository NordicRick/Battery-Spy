const Battery = require('./Batteries');
const HealthCheck = require('./Health_Checks');
const UsageLog = require('./Usage_Logs');
const Attachment = require('./Attachments');
const User = require('./Users');
const Status = require('./Status');

const defineAssociations = () => {
    // Battery associations
    Battery.hasMany(HealthCheck, { foreignKey: 'battery_id' });
    Battery.hasMany(UsageLog, { foreignKey: 'battery_id' });
    Battery.hasMany(Attachment, { foreignKey: 'battery_id' });
    Battery.hasMany(Status, { foreignKey: 'battery_id' });
    
    // BelongsTo associations
    HealthCheck.belongsTo(Battery, { foreignKey: 'battery_id' });
    UsageLog.belongsTo(Battery, { foreignKey: 'battery_id' });
    Attachment.belongsTo(Battery, { foreignKey: 'battery_id' });
    Status.belongsTo(Battery, { foreignKey: 'battery_id' });
    
    // User associations
    //User.hasMany(Battery, { foreignKey: 'user_id' });
    User.hasMany(HealthCheck, { foreignKey: 'user_id' });
    User.hasMany(UsageLog, { foreignKey: 'user_id' });
    User.hasMany(Status, { foreignKey: 'user_id' });
    User.hasMany(Attachment, { foreignKey: 'user_id' });
}

module.exports = defineAssociations;








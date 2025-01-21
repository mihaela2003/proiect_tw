
const sequelize = require('../config/db');   
const { DataTypes } = require('sequelize');  

const defineEventModel = require('./events');
const defineGroupModel = require('./groups');
const defineUserModel = require('./users');
const defineAttendanceModel = require('./attendance');

const Event = defineEventModel(sequelize, DataTypes);
const Group = defineGroupModel(sequelize, DataTypes);
const User = defineUserModel(sequelize, DataTypes);
const Attendance = defineAttendanceModel(sequelize, DataTypes);

User.hasMany(Group, { foreignKey: 'userId' });
Group.belongsTo(User, { foreignKey: 'userId' });

Group.hasMany(Event, { foreignKey: 'groupId' });
Event.belongsTo(Group, { foreignKey: 'groupId' });

Event.hasMany(Attendance, { foreignKey: 'eventId' });
Attendance.belongsTo(Event, { foreignKey: 'eventId' });

User.hasMany(Attendance, { foreignKey: 'userId' });
Attendance.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
  sequelize,   
  Event,
  Group,
  User,
  Attendance
};
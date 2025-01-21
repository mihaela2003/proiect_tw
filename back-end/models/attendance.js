
module.exports = (sequelize, DataTypes) => {
    const Attendance = sequelize.define('Attendance', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      checkInTime: {
        type: DataTypes.DATE,
        allowNull: false
      },
      eventId: {
        type: DataTypes.INTEGER,
        allowNull: false
     
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
        
      }
    }, {
      tableName: 'attendance',
      timestamps: false
    });
  
    return Attendance;
  };
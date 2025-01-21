
module.exports = (sequelize, DataTypes) => {
    const Event = sequelize.define('Event', {
      eventId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      startingTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      endingTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      isOpen: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      groupId: {
        type: DataTypes.INTEGER,
        allowNull: true     
      }
    }, {
      tableName: 'events', 
      timestamps: false    
    });
  
    return Event;
  };
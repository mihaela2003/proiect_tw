
module.exports = (sequelize, DataTypes) => {
    const Group = sequelize.define('Group', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      groupName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      userId: { 
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, {
      tableName: 'groups',
      timestamps: false
    });
  
    return Group;
  };
module.exports = (sequelize, Sequelize) => {
    const DataTypes = Sequelize.DataTypes;
    const Role= sequelize.define('Role', {
      id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true,
        allowNull:false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      }
     
    });
    return Role;
  };
  
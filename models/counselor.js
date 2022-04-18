module.exports = (sequelize, Sequelize) => {
    const DataTypes = Sequelize.DataTypes;
    const Counselor=sequelize.define("Counselor",{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            allowNull:false
        },
        Name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        AddedOn:{//Date in which this particular customer was added to our organization
            type:DataTypes.DATE,
            defaultValue:Date.now
        },
        isBooked:{
            type:DataTypes.STRING,
            defaultValue:"No"
        }

    })
    return Counselor;

};
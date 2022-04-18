const dbConfig = require("../configs/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./User.js")(sequelize, Sequelize);
db.Role = require("./Role.js")(sequelize, Sequelize);
db.Counselor=require("./counselor")(sequelize, Sequelize);


db.User.hasMany(db.Counselor);
db.User.belongsToMany(db.Role,{
  through:"User_roles",
  foreignKey:"user_id",
  otherKey:"role_id"
})

db.Role.belongsToMany(db.User,{
  through:"User_roles",
  foreignKey:"role_id",
  otherKey:"user_id"
})

module.exports = db;
const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,

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

db.users = require("./user.model.js")(sequelize, Sequelize);
db.topics = require("./topic.model.js")(sequelize, Sequelize);
db.comments = require("./comment.model.js")(sequelize, Sequelize);

// add primary-key users in topics table 

db.users.hasMany(db.topics, {
  foreignKey: {
  allowNull: false
},
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
db.topics.belongsTo(db.users);

// add primary-key topics and users in comment table 

db.topics.hasOne(db.comments, {
  foreignKey: {
    allowNull: false
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
db.users.hasOne(db.comments, {
  foreignKey: {
  allowNull: false
},
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

module.exports = db;

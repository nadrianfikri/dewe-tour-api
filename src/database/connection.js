const Sequelize = require('sequelize');

const db = {};
const sequelize = new Sequelize('db_dewetour', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  logging: console.log,
  frezzeTableName: true,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

db.sequelize = sequelize;

module.exports = db;

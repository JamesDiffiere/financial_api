const {Sequelize, Model, DataTypes} = require("sequelize");

const sequelize = new Sequelize('db', 'user', 'pass', {
    host: 'host',
    dialect: 'mysql',
    pool: {
        max: 1000000000,
        min: 0,
        idle: 200000000,
        acquire: 100000000,
      } /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
  });

  module.exports = sequelize;

const {sq} = require('../config/db');
const {DataTypes} = require('sequelize');

const Admins = sq.define('admins', {
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Admins.sync().then(() => {
  console.log('Admins Model synced');
});

module.exports = Admins;

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

Admins.create({
  id: '1',
  email: '123@lalala.com',
  password: '123',
});

module.exports = Admins;

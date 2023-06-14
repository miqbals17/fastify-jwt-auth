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

const Posts = sq.define('posts', {
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Admins.sync().then(() => {
  console.log('Admins Model synced');
});

Admins.findAll({where: {email: 'muhammadiqbals@mail.ugm.ac.id'}}).then((res) => console.log(res[0].id));

module.exports = {Admins, Posts};

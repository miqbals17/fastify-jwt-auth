const {sq} = require('../config/db');
const {DataTypes} = require('sequelize');

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

Posts.sync().then(() => {
  console.log('Posts Model synced');
});

module.exports = Posts;

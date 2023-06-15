const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('crud', 'postgres', 'Muhammadiqbal17#', {
  host: 'localhost',
  dialect: 'postgres',
  define: {
    timestamps: false,
  },
});

sequelize.authenticate()
    .then(() => console.log('Connection has been established successfully'))
    .catch((err) => console.err('Unable to connect to the database', err));

module.exports = {sq: sequelize};

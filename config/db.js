const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('crud', 'postgres', 'Muhammadiqbal17#', {
  host: 'localhost',
  dialect: 'postgres',
  define: {
    timestamps: false,
  },
});

const testDbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (err) {
    console.err('Unable to connect to the database', err);
  }
};

sequelize.authenticate()
    .then(() => console.log('Connection has been established successfully'))
    .catch((err) => console.err('Unable to connect to the database', err));

module.exports = {sq: sequelize, testDbConnection};

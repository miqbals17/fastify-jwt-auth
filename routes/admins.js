const {registerAdminHandler, loginAdminHandler} = require('../handler/admins');

const adminsRoute = (fastify, options, done) => {
  fastify.post('/register', registerAdminHandler);
  fastify.post('/login', loginAdminHandler);
  done();
};

module.exports = adminsRoute;

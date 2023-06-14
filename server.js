const client = require('./config/dbconnection');

const fastify = require('fastify')({logger: true});

const PORT = 5000;

fastify.register(require('./routes/posts'));
fastify.register(require('./routes/admins'));
fastify.register(require('@fastify/jwt'), {
  secret: 'velenoIX',
  cookie: {
    cookieName: 'tokenLogin',
  },
});
fastify.register(require('@fastify/cookie'));

fastify.decorate('AuthJWT', async (req, reply) => {
  try {
    await req.jwtVerify();
  } catch (err) {
    reply.send(err);
  }
});

const startServer = async () => {
  try {
    await fastify.listen({port: PORT});
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

client.connect((err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log('Database Connected');
  }
});

startServer();

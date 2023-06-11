const adminsRoute = (fastify, options, done) => {
  fastify.get('/jwtToken', async (req, reply) => {
    const token = await reply.jwtSign({
      'foo': 'bar',
    }, {expiresIn: 60});

    reply.setCookie('token', token, {
      httpOnly: true,
    }).code(200).send({msg: 'Cookie sent', token});
  });

  done();
};

module.exports = adminsRoute;

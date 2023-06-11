const admins = require('../cloud/admins');

const registerAdminHandler = async (req, reply) => {
  const {email, password} = req.body;

  const data = admins.filter((admin) => admin.email === email)[0];

  if (data) {
    return reply.code(400).send(new Error('Email telah terdaftar!'));
  }

  admins.push({email, password});
  reply.code(200).send({msg: 'Akun berhasil dibuat!'});
};

const loginAdminHandler = async (req, reply) => {
  const {email, password} = req.body;

  const data = admins.filter((admin) => admin.email === email)[0];

  if (!data) {
    reply.code(404).send(new Error('Email tidak terdaftar!'));
  } else if (data.password !== password) {
    reply.code(400).send(new Error('Password salah!'));
  }

  const tokenLogin = await reply.jwtSign({email}, {expiresIn: 120});

  reply.setCookie('tokenLogin', tokenLogin, {
    httpOnly: true,
  }).code(200).send({msg: 'Cookie sent'});
};

module.exports = {registerAdminHandler, loginAdminHandler};

const {nanoid} = require('nanoid');
const bcrypt = require('bcrypt');
const Admins = require('../models/admins');

const registerAdminHandler = (req, reply) => {
  const {email, password} = req.body;
  const id = nanoid();

  bcrypt.hash(password, 10).then(async (hashedPassword) => {
    await Admins.create({
      id: id,
      email: email,
      password: hashedPassword,
    }).then(() => {
      reply.code(200).send({msg: 'Akun berhasil terdaftar!'});
    }).catch((err) => {
      reply.code(500).send(err);
    });
  }).catch((err) => reply.code(500).send(err));
};

const loginAdminHandler = async (req, reply) => {
  const {email, password} = req.body;

  const user = await Admins.findAll({where: {email: email}});

  if (!user[0]) {
    reply.code(404).send(new Error('Email tidak terdaftar!'));
  } else {
    await bcrypt.compare(password, user[0].password).then((res) => {
      !res ? reply.code(400).send(new Error('Password salah!')) : null;
    });
  }

  reply.jwtSign({email}, {expiresIn: 120})
      .then((res) => {
        reply.setCookie('tokenLogin', res, {
          httpOnly: true,
        }).code(200).send({msg: 'Cookie Sent'});
      })
      .catch((err) => reply.code(500).send(err));
};

module.exports = {registerAdminHandler, loginAdminHandler};

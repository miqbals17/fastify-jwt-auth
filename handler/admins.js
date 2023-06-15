const {nanoid} = require('nanoid');
const Admins = require('../models/admins');

const registerAdminHandler = (req, reply) => {
  const {email, password} = req.body;
  const id = nanoid();

  Admins.create({
    id: id,
    email: email,
    password: password,
  }).then(() => {
    reply.code(200).send({msg: 'Akun berhasil terdaftar!'});
  }).catch((err) => {
    reply.code(500).send(err);
  });
};

const loginAdminHandler = (req, reply) => {
  const {email, password} = req.body;

  Admins.findAll({where: {email: email}})
      .then((res) => {
        if (res.length === 0) {
          reply.code(404).send(new Error('Email tidak terdaftar!'));
        } else if (res[0].password !== password) {
          reply.code(400).send(new Error('Password salah!'));
        }
      })
      .catch((err) => {
        reply.code(500).send(err);
      });

  reply.jwtSign({email}, {expiresIn: 120})
      .then((res) => {
        reply.setCookie('tokenLogin', res, {
          httpOnly: true,
        }).code(200).send({msg: 'Cookie sent'});
      })
      .catch((err) => reply.code(500).send(err));
};

module.exports = {registerAdminHandler, loginAdminHandler};

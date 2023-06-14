const {nanoid} = require('nanoid');
const client = require('../config/dbconnection');
const {Admins} = require('../models/sequelize');

const registerAdminHandler = (req, reply) => {
  const {email, password} = req.body;
  const id = nanoid();

  // client.query(`INSERT INTO admins (id, email, password) VALUES ('${id}', '${email}', '${password}')`, (err, results) => {
  //   if (err) {
  //     reply.code(500).send(new Error(err));
  //   } else {
  //     reply.code(200).send({msg: 'Akun berhasil didaftarkan'});
  //   }
  // });

  Admins.create({
    id: id,
    email: email,
    password: password,
  })
      .then(() => (reply.send(200).send({msg: 'Akun berhasil didaftarkan'})));
};

const loginAdminHandler = (req, reply) => {
  const {email, password} = req.body;

  client.query(`SELECT * FROM admins WHERE email='${email}'`, (err, results) => {
    if (err) {
      reply.code(500).send(new Error(err));
    } else if (results.rows.length === 0) {
      reply.code(404).send(new Error('Email tidak terdaftar!'));
    } else if (results.rows[0].password !== password) {
      reply.code(400).send(new Error('Password salah!'));
    }

    const tokenLogin = reply.jwtSign({email}, {expiresIn: 120});

    reply.setCookie('tokenLogin', tokenLogin, {
      httpOnly: true,
    }).code(200).send({msg: 'Cookie sent'});
  });
};

module.exports = {registerAdminHandler, loginAdminHandler};

const {nanoid} = require('nanoid');
const client = require('../config/dbconnection');
const {Posts} = require('../models/sequelize');

const getAllPostsHandler = (req, reply) => {
  Posts.findAll()
      .then((res) => reply.code(200).send(res))
      .catch((err) => reply.code(500).send(err));
};

const getPostHandler = (req, reply) => {
  const {id} = req.params;

  Posts.findAll({where: {id: id}})
      .then((res) => {
        if (res.length === 0) {
          reply.code(404).send(new Error('Id tidak ditemukan.'));
        } else {
          reply.code(200).send(res[0]);
        }
      })
      .catch((err) => reply.code(500).send(err));
  // client.query(`SELECT * FROM posts WHERE id='${id}'`, (err, results) => {
  //   if (err) {
  //     reply.code(400).send(new Error(err));
  //   }

  //   if (results.rows.length === 0) {
  //     reply.code(404).send(new Error('id tidak ditemukan!'));
  //   } else {
  //     reply.code(200).send(results.rows);
  //   }
  // });
};

const addPostHandler = (req, reply) => {
  const {title, description} = req.body;
  const id = nanoid();

  client.query(`INSERT INTO posts (id, title, description) VALUES ('${id}', '${title}', '${description}')`, (err, results) => {
    if (err) {
      reply.code(400).send(err.message);
    } else {
      reply.code(200).send({msg: 'Data berhasil ditambahkan!'});
    }
  });
};

const editPostHandler = (req, reply) => {
  const {id} = req.params;
  const {title, description} = req.body;

  client.query(`UPDATE posts SET title='${title}', description='${description}' WHERE id='${id}'`, (err, results) => {
    if (err) {
      reply.code(400).send(err.message);
    } else {
      reply.code(200).send({msg: 'Data berhasil diubah!'});
    }
  });
  // Error handling ketika data dengan id tidak ditemukan
};

const deletePostHandler = (req, reply) => {
  const {id} = req.params;

  client.query(`DELETE FROM posts WHERE id='${id}'`, (err, results) => {
    if (err) {
      reply.code(400).send(err.message);
    } else {
      reply.code(200).send(`Data dengan id ${id} berhasil dihapus`);
    }
  });
  // Error handling ketika data dengan id tidak ditemukan
};

module.exports = {getAllPostsHandler, getPostHandler, addPostHandler, editPostHandler, deletePostHandler};

const {nanoid} = require('nanoid');
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
};

const addPostHandler = (req, reply) => {
  const {title, description} = req.body;
  const id = nanoid();

  Posts.create({
    id: id,
    title: title,
    description: description,
  }).then(() => reply.code(200).send({msg: 'Data berhasil ditambahkan!'}))
      .catch((err) => reply.code(400).send(err));
};

const editPostHandler = (req, reply) => {
  const {id} = req.params;
  const {title, description} = req.body;

  Posts.update({
    title: title,
    description: description,
  }, {where: {id: id}})
      .then(() => reply.code(200).send({msg: 'Data berhasil diubah.'}))
      .catch((err) => reply.code(400).send(err));
};

const deletePostHandler = (req, reply) => {
  const {id} = req.params;

  Posts.destroy({
    where: {
      id: id,
    },
  }).then(() => reply.code(200).send({msg: `Data dengan id: ${id} berhasil dihapus.`}))
      .catch((err) => reply.code(400).send(err));
};

module.exports = {getAllPostsHandler, getPostHandler, addPostHandler, editPostHandler, deletePostHandler};

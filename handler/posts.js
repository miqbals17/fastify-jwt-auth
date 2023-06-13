/* eslint-disable max-len */
const {nanoid} = require('nanoid');
const client = require('../database/connection');

const getAllPostsHandler = (req, reply) => {
  client.query('SELECT * FROM posts', (err, results) => {
    if (!err) {
      const data = results.rows.map(({...data}) => ({id: data.id, title: data.title}));
      reply.send(data);
    }
  });
};

const getPostHandler = (req, reply) => {
  const {id} = req.params;

  client.query(`SELECT * FROM posts WHERE id='${id}'`, (err, results) => {
    if (err) {
      reply.code(404).send(new Error('Id post tidak ditemukan'));
    }
    reply.code(200).send(results.rows);
  });

  // if (!data) {
  //   reply.code(404).send(new Error('Id post tidak ditemukan'));
  // }

  // reply.code(200).send(data);
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

  const post = posts.filter((post) => post.id === id)[0];

  if (!post) {
    reply.code(404).send(new Error('Id post tidak ditemukan'));
  }

  post.title = title;
  post.description = description;

  reply.code(200).send('Data berhasil diubah!');
};

const deletePostHandler = (req, reply) => {
  const {id} = req.params;

  const index = posts.findIndex((post) => post.id === id);

  if (index === -1) {
    reply.code(404).send(new Error('Id post tidak ditemukan'));
  }

  posts.splice(index, 1);
  reply.code(200).send(`Data dengan id ${id} berhasil dihapus `);
};

module.exports = {getAllPostsHandler, getPostHandler, addPostHandler, editPostHandler, deletePostHandler};

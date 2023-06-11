/* eslint-disable max-len */
const {nanoid} = require('nanoid');
const posts = require('../cloud/posts');

const getAllPostsHandler = (req, reply) => {
  const data = posts.map(({...data}) => ({id: data.id, title: data.title}));
  reply.send(data);
};

const getPostHandler = (req, reply) => {
  const {id} = req.params;

  const data = posts.filter((post) => post.id == id)[0];

  if (!data) {
    reply.code(404).send(new Error('Id post tidak ditemukan'));
  }

  reply.code(200).send(data);
};

const addPostHandler = (req, reply) => {
  const {title, description} = req.body;
  const id = nanoid();

  posts.push({id, title, description});

  reply.code(200).send('Data berhasil ditambahkan!');
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

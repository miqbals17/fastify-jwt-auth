/* eslint-disable max-len */
const {getAllPostsHandler, addPostHandler, getPostHandler, editPostHandler} = require('../handler/posts');

const postsRoute = (fastify, options, done) => {
  fastify.get('/posts', getAllPostsHandler);
  fastify.get('/posts/:id', {onRequest: [fastify.AuthJWT]}, getPostHandler);
  fastify.post('/posts/new', {onRequest: [fastify.AuthJWT]}, addPostHandler);
  fastify.put('/posts/:id', {onRequest: [fastify.AuthJWT]}, editPostHandler);

  done();
};

module.exports = postsRoute;

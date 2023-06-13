const {getAllPostsHandler, addPostHandler, getPostHandler, editPostHandler, deletePostHandler} = require('../handler/posts');

const postsRoute = (fastify, options, done) => {
  fastify.get('/posts', getAllPostsHandler);
  fastify.get('/posts/:id', getPostHandler);
  fastify.post('/posts/new', addPostHandler);
  fastify.put('/posts/:id', {onRequest: [fastify.AuthJWT]}, editPostHandler);
  fastify.delete('/posts/:id', {onRequest: [fastify.AuthJWT]}, deletePostHandler);

  done();
};

module.exports = postsRoute;

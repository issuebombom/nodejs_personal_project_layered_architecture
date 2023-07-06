const express = require('express');
const postRouter = express.Router();

const AuthMiddleware = require('../middlewares/auth.middleware');
const auth = new AuthMiddleware();

const PostController = require('../controllers/posts.controller');
const postController = new PostController();

postRouter.get('/posts', postController.getAllPosts);
postRouter.get('/posts/:postId', postController.getPost);
postRouter.post('/posts', auth.verifyAccessToken, postController.createPost);
postRouter.put('/posts/:postId', auth.verifyAccessToken, postController.modifyPost);
postRouter.delete('/posts/:postId', auth.verifyAccessToken, postController.deletePost);

module.exports = postRouter;

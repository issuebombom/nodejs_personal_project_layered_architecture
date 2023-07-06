const express = require('express');
const postRouter = express.Router();

const PostController = require('../controllers/posts.controller');
const postController = new PostController();

postRouter.get('/posts', postController.getAllPosts);
postRouter.get('/posts/:postId', postController.getPost);
postRouter.post('/posts', postController.createPost);
postRouter.put('/posts/:postId', postController.modifyPost);
postRouter.delete('/posts/:postId', postController.deletePost);

module.exports = postRouter;

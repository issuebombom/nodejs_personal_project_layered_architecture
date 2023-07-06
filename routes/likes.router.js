const express = require('express');
const likesRouter = express.Router();

const AuthMiddleware = require('../middlewares/auth.middleware');
const auth = new AuthMiddleware();

const LikesController = require('../controllers/likes.controller');
const likesController = new LikesController();

likesRouter.get('/posts/:postId/likes', likesController.countLikesOnPost);
likesRouter.post('/posts/:postId/likes', auth.verifyAccessToken, likesController.addLikesOnPost);
likesRouter.delete(
  '/posts/:postId/likes',
  auth.verifyAccessToken,
  likesController.removeLikesOnPost
);
likesRouter.get('/posts/:postId/comments/:commentId/likes', likesController.countLikesOnComment);
likesRouter.post(
  '/posts/:postId/comments/:commentId/likes',
  auth.verifyAccessToken,
  likesController.addLikesOnComment
);
likesRouter.delete(
  '/posts/:postId/comments/:commentId/likes',
  auth.verifyAccessToken,
  likesController.removeLikesOnComment
);

module.exports = likesRouter;

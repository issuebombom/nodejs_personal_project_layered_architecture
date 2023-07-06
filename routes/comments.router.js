const express = require('express');
const commentRouter = express.Router();

const AuthMiddleware = require('../middlewares/auth.middleware');
const auth = new AuthMiddleware();

const CommentController = require('../controllers/comments.controller');
const commentController = new CommentController();

commentRouter.get('/posts/:postId/comments', commentController.getCommentsByPost);
commentRouter.post(
  '/posts/:postId/comments',
  auth.verifyAccessToken,
  commentController.createComment
);
commentRouter.put(
  '/posts/:postId/comments/:commentId',
  auth.verifyAccessToken,
  commentController.modifyComment
);
commentRouter.delete(
  '/posts/:postId/comments/:commentId',
  auth.verifyAccessToken,
  commentController.deleteComment
);

module.exports = commentRouter;

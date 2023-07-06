const CommentService = require('../services/comments.service');

class CommentController {
  commentService = new CommentService();

  getCommentsByPost = async (req, res) => {
    try {
      const { postId } = req.params;
      const comments = await this.commentService.findCommentsByPost(postId);

      if (comments.length === 0) return res.status(404).send({ message: '댓글 정보 없음' });

      res.status(200).send({ data: comments });
    } catch (err) {
      console.error(err.name, ':', err.message);
      return res.status(400).send({ message: `${err.message}` });
    }
  };

  createComment = async (req, res) => {
    try {
      const { content } = req.body;
      const { userId } = res.locals.user;
      const { postId } = req.params;
      const createdCommentResult = await this.commentService.createComment(userId, postId, content);

      if (!createdCommentResult) return res.status(400).send({ message: '댓글 생성 실패' });

      res.status(200).send({ message: '댓글 작성 완료' });
    } catch (err) {
      console.error(err.name, ':', err.message);
      return res.status(400).send({ message: `${err.message}` });
    }
  };

  modifyComment = async (req, res) => {
    try {
      const { content } = req.body;
      const { userId } = res.locals.user;
      const { commentId } = req.params;
      const comment = await this.commentService.findComment(commentId);

      if (!comment) return res.status(404).send({ message: '댓글 정보 없음' });

      if (userId !== comment.UserId) return res.status(412).send({ message: '수정 권한 없음' });

      await this.commentService.modifyComment(commentId, content);

      res.status(200).send({ message: '댓글 수정 완료' });
    } catch (err) {
      console.error(err.name, ':', err.message);
      return res.status(400).send({ message: `${err.message}` });
    }
  };

  deleteComment = async (req, res) => {
    try {
      const { commentId } = req.params;
      const { userId } = res.locals.user;
      const comment = await this.commentService.findComment(commentId);

      if (userId !== comment.UserId) return res.status(412).send({ message: '삭제 권한 없음' });

      const deletedCommentResult = await this.commentService.deleteComment(commentId);

      if (!deletedCommentResult) return res.status(404).send({ message: '댓글 정보 없음' });

      res.status(200).send({ message: '댓글 삭제 완료' });
    } catch (err) {
      console.error(err.name, ':', err.message);
      return res.status(400).send({ message: `${err.message}` });
    }
  };
}

module.exports = CommentController;

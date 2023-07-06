const CommentRepository = require('../repositories/comments.repository');

class CommentService {
  commentRepository = new CommentRepository();

  findCommentsByPost = async (postId) => {
    const findCommentData = await this.commentRepository.findCommentsByPostId(postId);
    // 호출한 Post들을 가장 최신 게시글 부터 정렬합니다.
    findCommentData.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });
    return findCommentData;
  };

  findComment = async (commentId) => {
    const findCommentData = await this.commentRepository.findCommentById(commentId);
    return findCommentData;
  };

  createComment = async (UserId, PostId, content) => {
    const createdCommentResult = await this.commentRepository.createComment(
      UserId,
      PostId,
      content
    );
    return createdCommentResult;
  };

  modifyComment = async (commentId, content) => {
    const modifiedCommentResult = await this.commentRepository.modifyComment(commentId, content);
    return modifiedCommentResult;
  };

  deleteComment = async (commentId) => {
    const deletedCommentResult = await this.commentRepository.deleteComment(commentId);
    return deletedCommentResult;
  };
}

module.exports = CommentService;

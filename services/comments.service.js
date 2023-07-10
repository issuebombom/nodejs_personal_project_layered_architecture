const CommentRepository = require('../repositories/comments.repository');

class CommentService {
  commentRepository = new CommentRepository();

  findCommentsByPost = async (postId, orderby) => {
    orderby = orderby ? orderby : 'recent'; // default: recent
    const findCommentData = await this.commentRepository.findCommentsByPostId(postId);
    switch (orderby) {
      case 'recent':
        findCommentData.sort((a, b) => {
          return b.createdAt - a.createdAt;
        });
      case 'likes':
        findCommentData.sort((a, b) => {
          return b.LikesComments.length - a.LikesComments.length;
        });
    }
    return findCommentData.map((comment) => {
      return {
        commentId: comment.commentId,
        UserId: comment.UserId,
        content: comment.content,
        likes: comment.LikesComments.length,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt,
      };
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

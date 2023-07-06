const { Comment } = require('../models');

class CommentRepository {
  findCommentsByPostId = async (PostId) => {
    const findCommentData = await Comment.findAll({ where: { PostId } });
    return findCommentData;
  };

  findCommentById = async (commentId) => {
    const findCommentData = await Comment.findByPk(commentId);
    return findCommentData;
  };

  searchComment = async (keyword) => {
    const searchedComments = await Comment.findAll({
      where: {
        [Op.or]: [{ content: { [Op.like]: `%${keyword}%` } }],
      },
    });
    return searchedComments;
  };

  createComment = async (UserId, PostId, content) => {
    const createCommentData = await Comment.create({ UserId, PostId, content });
    return createCommentData;
  };

  modifyComment = async (commentId, content) => {
    const modifiedCommentData = await Comment.update({ content }, { where: { commentId } });
    return modifiedCommentData;
  };

  deleteComment = async (commentId) => {
    const deletedCommentData = await Comment.destroy({ where: { commentId } });
    return deletedCommentData;
  };
}

module.exports = CommentRepository;

const { LikesPost, LikesComment } = require('../models');

class LikesRepository {
  findLikesOnPost = async (PostId) => {
    const likesData = await LikesPost.findAll({ where: { PostId } });
    return likesData;
  };

  findLikesOnPostByUser = async (UserId, PostId) => {
    const likesData = await LikesPost.findAll({ where: { UserId, PostId } });
    return likesData;
  };

  addLikesOnPost = async (UserId, PostId) => {
    const addedLikesData = await LikesPost.create({ UserId, PostId });
    return addedLikesData;
  };

  removeLikesOnPost = async (UserId, PostId) => {
    const removedLikesData = await LikesPost.destroy({ where: { UserId, PostId } });
    return removedLikesData;
  };

  findLikesOnComment = async (CommentId) => {
    const likesData = await LikesComment.findAll({ where: { CommentId } });
    return likesData;
  };

  findLikesOnCommentByUser = async (UserId, CommentId) => {
    const likesData = await LikesComment.findAll({ where: { UserId, CommentId } });
    return likesData;
  };

  addLikesOnComment = async (UserId, CommentId) => {
    const addedLikesData = await LikesComment.create({ UserId, CommentId });
    return addedLikesData;
  };

  removeLikesOnComment = async (UserId, CommentId) => {
    const removedLikesData = await LikesComment.destroy({ where: { UserId, CommentId } });
    return removedLikesData;
  };
}

module.exports = LikesRepository;

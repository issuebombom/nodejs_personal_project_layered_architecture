const LikesRepository = require('../repositories/likes.repository');

class CommentService {
  likesRepository = new LikesRepository();

  numberOfLikesOnPost = async (userId, postId) => {
    const numberOfLikes = await this.likesRepository.findLikesOnPost(userId, postId);
    return numberOfLikes.length;
  };

  numberOfLikesOnPostByUser = async (userId, postId) => {
    const numberOfLikes = await this.likesRepository.findLikesOnPostByUser(userId, postId);
    return numberOfLikes.length;
  };

  addLikesOnPost = async (userId, postId) => {
    const addedLikesData = await this.likesRepository.addLikesOnPost(userId, postId);
    return addedLikesData;
  };

  removeLikesOnPost = async (userId, postId) => {
    const removedLikesData = await this.likesRepository.removeLikesOnPost(userId, postId);
    return removedLikesData;
  };

  numberOfLikesOnComment = async (userId, commentId) => {
    const numberOfLikes = await this.likesRepository.findLikesOnComment(userId, commentId);
    return numberOfLikes.length;
  };

  numberOfLikesOnCommentByUser = async (userId, commentId) => {
    const numberOfLikes = await this.likesRepository.findLikesOnCommentByUser(userId, commentId);
    return numberOfLikes.length;
  };

  addLikesOnComment = async (userId, commentId) => {
    const addedLikesData = await this.likesRepository.addLikesOnComment(userId, commentId);
    return addedLikesData;
  };

  removeLikesOnComment = async (userId, commentId) => {
    const removedLikesData = await this.likesRepository.removeLikesOnComment(userId, commentId);
    return removedLikesData;
  };
}

module.exports = CommentService;

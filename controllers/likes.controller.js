const LikesService = require('../services/likes.service');

class LikesController {
  likesService = new LikesService();

  countLikesOnPost = async (req, res) => {
    try {
      const { postId } = req.params;
      const numberOfLikes = await this.likesService.numberOfLikesOnPost(postId);
      res.status(200).send({ data: numberOfLikes });
    } catch (err) {
      console.error(err.name, ':', err.message);
      return res.status(400).send({ message: `${err.message}` });
    }
  };

  addLikesOnPost = async (req, res) => {
    try {
      const { userId } = res.locals.user;
      const { postId } = req.params;

      // 이미 좋아요를 눌렀는지 확인
      const numberOfLikes = await this.likesService.numberOfLikesOnPostByUser(userId, postId);
      if (numberOfLikes >= 1) return res.status(200).send({ message: '이미 좋아요를 눌렀음' });

      await this.likesService.addLikesOnPost(userId, postId);
      res.status(200).send({ message: '좋아요 누르기 성공' });
    } catch (err) {
      console.error(err.name, ':', err.message);
      return res.status(400).send({ message: `${err.message}` });
    }
  };

  removeLikesOnPost = async (req, res) => {
    try {
      const { userId } = res.locals.user;
      const { postId } = req.params;

      // 좋아요를 누른 적이 없거나 이미 좋아요를 취소했는지 확인
      const numberOfLikes = await this.likesService.numberOfLikesOnPostByUser(userId, postId);
      if (numberOfLikes <= 0) return res.status(200).send({ message: '좋아요를 누른 적이 없음' });

      await this.likesService.removeLikesOnPost(userId, postId);
      res.status(200).send({ message: '좋아요 취소 성공' });
    } catch (err) {
      console.error(err.name, ':', err.message);
      return res.status(400).send({ message: `${err.message}` });
    }
  };

  countLikesOnComment = async (req, res) => {
    try {
      const { commentId } = req.params;
      const numberOfLikes = await this.likesService.numberOfLikesOnComment(commentId);
      res.status(200).send({ data: numberOfLikes });
    } catch (err) {
      console.error(err.name, ':', err.message);
      return res.status(400).send({ message: `${err.message}` });
    }
  };

  addLikesOnComment = async (req, res) => {
    try {
      const { userId } = res.locals.user;
      const { commentId } = req.params;

      // 이미 좋아요를 눌렀는지 확인
      const numberOfLikes = await this.likesService.numberOfLikesOnCommentByUser(userId, commentId);
      if (numberOfLikes >= 1) return res.status(200).send({ message: '이미 좋아요를 눌렀음' });

      await this.likesService.addLikesOnComment(userId, commentId);
      res.status(200).send({ message: '좋아요 누르기 성공' });
    } catch (err) {
      console.error(err.name, ':', err.message);
      return res.status(400).send({ message: `${err.message}` });
    }
  };

  removeLikesOnComment = async (req, res) => {
    try {
      const { userId } = res.locals.user;
      const { commentId } = req.params;

      // 좋아요를 누른 적이 없거나 이미 좋아요를 취소했는지 확인
      const numberOfLikes = await this.likesService.numberOfLikesOnCommentByUser(userId, commentId);
      if (numberOfLikes <= 0) return res.status(200).send({ message: '좋아요를 누른 적이 없음' });

      await this.likesService.removeLikesOnComment(userId, commentId);
      res.status(200).send({ message: '좋아요 취소 성공' });
    } catch (err) {
      console.error(err.name, ':', err.message);
      return res.status(400).send({ message: `${err.message}` });
    }
  };
}

module.exports = LikesController;

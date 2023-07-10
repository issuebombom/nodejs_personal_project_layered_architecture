const { Post, Comment, LikesPost } = require('../models');

class PostRepository {
  findPostById = async (postId) => {
    const findPostData = await Post.findByPk(postId);
    return findPostData;
  };

  findAllPosts = async () => {
    const findPostData = await Post.findAll({
      include: [
        {
          model: LikesPost,
          attributes: ['LikesPostId', 'UserId'],
        },
        {
          model: Comment,
          attributes: ['UserId', 'content']
        }
      ],
    });
    return findPostData;
  };

  searchPosts = async (keyword) => {
    const searchedPosts = await Post.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${keyword}%` } },
          { content: { [Op.like]: `%${keyword}%` } },
        ],
      },
    });
    return searchedPosts;
  };

  createPost = async (UserId, title, topic, content) => {
    const createPostData = await Post.create({ UserId, title, topic, content });
    return createPostData;
  };

  modifyPost = async (postId, title, topic, content) => {
    const modifiedPostData = await Post.update({ title, topic, content }, { where: { postId } });
    return modifiedPostData;
  };

  deletePost = async (postId) => {
    const deletedPostData = await Post.destroy({ where: { postId } });
    return deletedPostData;
  };
}

module.exports = PostRepository;

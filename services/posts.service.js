const PostRepository = require('../repositories/posts.repository');

class PostService {
  postRepository = new PostRepository();

  findAllPosts = async () => {
    const findPostData = await this.postRepository.findAllPosts();
    return findPostData;
  };

  findPost = async (postId) => {
    const findPostData = await this.postRepository.findPostById(postId);
    return findPostData;
  };

  createPost = async (UserId, title, content, topic) => {
    const createdPostResult = await this.postRepository.createPost(UserId, title, content, topic);
    return createdPostResult;
  };

  modifyPost = async (postId, title, content, topic) => {
    const modifiedPostResult = await this.postRepository.modifyPost(postId, title, topic, content);
    return modifiedPostResult;
  };

  deletePost = async (postId) => {
    const deletedPostResult = await this.postRepository.deletePost(postId);
    return deletedPostResult;
  };
}

module.exports = PostService;

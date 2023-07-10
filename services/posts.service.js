const PostRepository = require('../repositories/posts.repository');

class PostService {
  postRepository = new PostRepository();

  findAllPosts = async (orderby) => {
    orderby = orderby ? orderby : 'recent'; // default: recent
    const findPostData = await this.postRepository.findAllPosts();
    switch (orderby) {
      case 'recent':
        findPostData.sort((a, b) => {
          return b.createdAt - a.createdAt;
        });
      case 'likes':
        findPostData.sort((a, b) => {
          return b.LikesPosts.length - a.LikesPosts.length;
        });
    }
    return findPostData.map((post) => {
      return {
        postId: post.postId,
        UserId: post.UserId,
        title: post.title,
        content: post.content,
        topic: post.topic,
        comments: post.Comments.length,
        likes: post.LikesPosts.length,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      };
    });
  };

  findPost = async (postId) => {
    const findPostData = await this.postRepository.findPostById(postId);
    return findPostData;
  };

  createPost = async (UserId, title, content, topic) => {
    const createdPostResult = await this.postRepository.createPost(UserId, title, content, topic);
    return createdPostResult;
  };

  modifyPost = async (postId, title, topic, content) => {
    const modifiedPostResult = await this.postRepository.modifyPost(postId, title, topic, content);
    return modifiedPostResult;
  };

  deletePost = async (postId) => {
    const deletedPostResult = await this.postRepository.deletePost(postId);
    return deletedPostResult;
  };
}

module.exports = PostService;

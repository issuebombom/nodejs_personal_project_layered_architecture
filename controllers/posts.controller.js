const PostService = require('../services/posts.service');

class PostController {
  postService = new PostService();

  getAllPosts = async (req, res) => {
    try {
      const posts = this.postService.findAllPosts();

      if (posts.length === 0) return res.status(404).send({ message: '게시글 정보 없음' });

      res.status(200).send({ data: posts });
    } catch (err) {
      console.error(err.name, ':', err.message);
      return res.status(400).send({ message: `${err.message}` });
    }
  };

  getPost = async (req, res) => {
    try {
      const { postId } = req.params;
      const post = this.postService.findPost(postId);

      if (!post) return res.status(404).send({ message: '게시글 정보 없음' });

      res.status(200).send({ data: post });
    } catch (err) {
      console.error(err.name, ':', err.message);
      return res.status(400).send({ message: `${err.message}` });
    }
  };

  createPost = async (req, res) => {
    try {
      const { title, topic, content } = req.body;
      const { userId } = res.locals.user;
      const createdPostResult = this.postService.createPost(userId, title, topic, content);

      if (!createdPostResult) return res.status(400).send({ message: '게시글 생성 실패' });

      res.status(200).send({ message: '게시글 작성 완료' });
    } catch (err) {
      console.error(err.name, ':', err.message);
      return res.status(400).send({ message: `${err.message}` });
    }
  };

  modifyPost = async (req, res) => {
    try {
      const { title, content, topic } = req.body;
      const { postId } = req.params;
      const modifiedPostResult = this.postService.modifyPost(postId, title, topic, content);

      if (!modifiedPostResult) return res.status(404).send({ message: '게시글 정보 없음' });

      res.status(200).send({ message: '게시글 수정 완료' });
    } catch (err) {
      console.error(err.name, ':', err.message);
      return res.status(400).send({ message: `${err.message}` });
    }
  };

  deletePost = async (req, res) => {
    try {
      const { postId } = req.params;
      const deletedPostResult = this.postService.deletePost(postId);

      if (!deletedPostResult) return res.status(404).send({ message: '게시글 정보 없음' });

      res.status(200).send({ message: '게시글 삭제 완료' });
    } catch (err) {
      console.error(err.name, ':', err.message);
      return res.status(400).send({ message: `${err.message}` });
    }
  };
}

module.exports = PostController;

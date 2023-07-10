const PostService = require('../services/posts.service');

class PostController {
  postService = new PostService();

  getAllPosts = async (req, res) => {
    try {
      const { orderby } = req.query; // orderby 쿼리로 'likes'를 받으면 좋아요 많은 순으로 정렬합니다. 없으면 최신순
      const posts = await this.postService.findAllPosts(orderby);

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
      const post = await this.postService.findPost(postId);

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
      const createdPostResult = await this.postService.createPost(userId, title, topic, content);

      if (!createdPostResult) return res.status(400).send({ message: '게시글 생성 실패' });

      res.status(200).send({ message: '게시글 작성 완료' });
    } catch (err) {
      console.error(err.name, ':', err.message);
      return res.status(400).send({ message: `${err.message}` });
    }
  };

  modifyPost = async (req, res) => {
    try {
      const { postId } = req.params;
      const { userId } = res.locals.user;
      const { title, content, topic } = req.body;
      const post = await this.postService.findPost(postId);

      if (!post) return res.status(404).send({ message: '게시글 정보 없음' });

      if (userId !== post.UserId) return res.status(412).send({ message: '수정 권한 없음' });

      await this.postService.modifyPost(postId, title, topic, content);

      res.status(200).send({ message: '게시글 수정 완료' });
    } catch (err) {
      console.error(err.name, ':', err.message);
      return res.status(400).send({ message: `${err.message}` });
    }
  };

  deletePost = async (req, res) => {
    try {
      const { postId } = req.params;
      const { userId } = res.locals.user;
      const post = await this.postService.findPost(postId);

      if (userId !== post.UserId) return res.status(412).send({ message: '삭제 권한 없음' });

      const deletedPostResult = await this.postService.deletePost(postId);

      if (!deletedPostResult) return res.status(404).send({ message: '게시글 정보 없음' });

      res.status(200).send({ message: '게시글 삭제 완료' });
    } catch (err) {
      console.error(err.name, ':', err.message);
      return res.status(400).send({ message: `${err.message}` });
    }
  };
}

module.exports = PostController;

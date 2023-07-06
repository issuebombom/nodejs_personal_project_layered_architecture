const UserService = require('../services/users.service');
const AuthMiddleware = require('../middlewares/auth.middleware');
const { RefreshToken } = require('../models');
const bcrypt = require('bcrypt');

class UserController {
  userService = new UserService();
  authMiddleware = new AuthMiddleware();

  getUsers = async (req, res) => {
    try {
      const users = await this.userService.findAllUsers();

      // 유저 정보 없음
      if (!users) return res.status(404).send({ message: '유저 정보 없음' });
      res.status(200).send({ data: users });
    } catch (err) {
      console.error(err.name, ':', err.message);
      return res.status(400).send({ message: `${err.message}` });
    }
  };
  getUser = async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await this.userService.findUserCommonData(userId);

      // 유저 정보 없음
      if (!user) return res.status(404).send({ message: '유저 정보 없음' });
      res.status(200).send({ data: user });
    } catch (err) {
      console.error(err.name, ':', err.message);
      return res.status(400).send({ message: `${err.message}` });
    }
  };

  modifyUserInfo = async (req, res) => {
    try {
      const { userId } = res.locals.user;
      const { nickname, email, gender, interestTopic } = req.body;

      await this.userService.modifyUserInfo(userId, nickname, email, gender, interestTopic);
      res.status(200).send({ message: '개인정보 수정 성공' });
    } catch (err) {
      console.error(err.name, ':', err.message);
      return res.status(400).send({ message: `${err.message}` });
    }
  };

  modifyUserPassword = async (req, res) => {
    try {
      const { userId } = res.locals.user;
      const { password, newPassword, confirm } = req.body;
      const findUserAllData = await this.userService.findUserAllData(userId);

      // 패스워드 검증
      const isPasswordValid = await bcrypt.compare(password, findUserAllData.password);
      if (!isPasswordValid) return res.status(412).send({ message: '비밀번호 틀렸음' });

      if (newPassword !== confirm)
        return res.status(412).send({ message: '암호와 암호확인 불일치' });

      if (password === newPassword) return res.status(400).send({ message: '비밀번호가 그대로임' });

      const hashedPassword = await bcrypt.hash(newPassword, 10); // pw, salt_rounds
      await this.userService.modifyUserPassword(userId, hashedPassword);
      res.status(200).send({ message: '비밀번호 변경 성공' });
    } catch (err) {
      console.error(err.name, ':', err.message);
      return res.status(400).send({ message: `${err.message}` });
    }
  };

  signup = async (req, res) => {
    try {
      const { nickname, password, confirm, email, gender, interestTopic } = req.body;

      // comfirm 검증
      if (password !== confirm) return res.status(412).send({ message: '암호와 암호확인 불일치' });

      // 유효성 검증

      // 해시화
      const hashedPassword = await bcrypt.hash(password, 10); // pw, salt_rounds
      const createUserData = await this.userService.createUser(
        nickname,
        hashedPassword,
        email,
        gender,
        interestTopic
      );
      res.status(200).send({ data: createUserData });
    } catch (err) {
      console.error(err.name, ':', err.message);
      return res.status(400).send({ message: `${err.message}` });
    }
  };

  login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const findUserAllData = await this.userService.findUserAllData(email);

      // 이메일 검증
      if (!findUserAllData) return res.status(404).send({ message: '회원이 아님' });

      // 패스워드 검증
      const isPasswordValid = await bcrypt.compare(password, findUserAllData.password);
      if (!isPasswordValid) return res.status(412).send({ message: '비밀번호 틀렸음' });

      // 토큰 생성
      const userId = findUserAllData.userId;
      const accessToken = this.authMiddleware.createAccessToken(userId);
      const refreshToken = this.authMiddleware.createRefreshToken();

      // 리프레시 토큰 DB 저장
      try {
        await RefreshToken.create({ refreshToken, UserId: userId });
      } catch (err) {
        console.error(err.name, ':', err.message);
        return res.status(500).send({ message: `${err.message}` });
      }

      // 쿠키 저장
      res.cookie('accessToken', accessToken);
      res.cookie('refreshToken', refreshToken);

      res.status(200).send({ message: '로그인 완료' });
    } catch (err) {
      console.error(err.name, ':', err.message);
      return res.status(400).send({ message: `${err.message}` });
    }
  };

  leave = async (req, res) => {
    try {
      const { userId } = res.locals.user;
      await this.userService.deleteUserInfo(userId);
      res.status(200).send({ message: '탈퇴 완료' });
    } catch (err) {
      console.error(err.name, ':', err.message);
      return res.status(400).send({ message: `${err.message}` });
    }
  };
}

module.exports = UserController;

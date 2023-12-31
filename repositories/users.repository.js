const { User, RefreshToken, ProfileImage } = require('../models');

class UserRepository {
  // 유저 데이터 생성 (회원가입)
  createUser = async (nickname, password, email, gender, interestTopic) => {
    const createUserData = await User.create({ nickname, password, email, gender, interestTopic });
    return createUserData;
  };

  createProfileImage = async (imageUrl, UserId) => {
    const createdProfileImage = await ProfileImage.create({ imageUrl, UserId });
    return createdProfileImage;
  };

  findProfileImage = async (UserId) => {
    const findProfileImage = await ProfileImage.findAll({ where: { UserId } });
    return findProfileImage;
  };

  findAllUsers = async () => {
    const findUserData = await User.findAll();
    return findUserData;
  };

  findUserById = async (userId) => {
    const findUserData = await User.findByPk(userId);
    return findUserData;
  };

  findUserByEmail = async (email) => {
    const findUserData = await User.findOne({ where: { email } });
    return findUserData;
  };

  modifyUserInfo = async (userId, nickname, email, gender, interestTopic) => {
    const modifiedUserData = await User.update(
      {
        nickname,
        email,
        gender,
        interestTopic,
      },
      { where: { userId } }
    );
    return modifiedUserData;
  };

  modifyUserPassword = async (userId, password) => {
    const modifiedUserPassword = await User.update({ password }, { where: { userId } });
    return modifiedUserPassword;
  };

  deleteUserInfo = async (userId) => {
    const deletedUserInfo = await User.destroy({ where: { userId } });
    return deletedUserInfo;
  };

  findRefreshTokenByUserId = async (UserId) => {
    const findRefreshTokenData = await RefreshToken.findOne({ UserId });
    return findRefreshTokenData;
  };

  createRefreshToken = async (refreshToken, UserId) => {
    const createdRefreshToken = await RefreshToken.create({ refreshToken, UserId });
    return createdRefreshToken;
  };

  updateRefreshToken = async (refreshToken, UserId) => {
    const updatedRefreshToken = await RefreshToken.update({ refreshToken }, { where: { UserId } });
    return updatedRefreshToken;
  };

  deleteRefreshToken = async (UserId) => {
    const deletedRefreshToken = await RefreshToken.destroy({ where: { UserId } });
    return deletedRefreshToken;
  };
}

module.exports = UserRepository;

const { User } = require('../models');

class UserRepository {
  // 유저 데이터 생성 (회원가입)
  createUser = async (nickname, password, email, gender, interestTopic) => {
    const createUserData = await User.create({ nickname, password, email, gender, interestTopic });
    return createUserData;
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
}

module.exports = UserRepository;

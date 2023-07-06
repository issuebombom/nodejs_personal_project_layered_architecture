const { User } = require('../models');

class UserRepository {
  // 유저 데이터 생성 (회원가입)
  createUser = async (nickname, password, email, gender, interestTopic) => {
    const createUserData = await User.create({ nickname, password, email, gender, interestTopic });
    return createUserData;
  };

  findUserById = async (userId) => {
    const findUserData = await User.findByPk(userId);
    return findUserData;
  };

  findUserByEmail = async (email) => {
    const findUserData = await User.findOne({ where: { email } });
    return findUserData
  };
}

module.exports = UserRepository;

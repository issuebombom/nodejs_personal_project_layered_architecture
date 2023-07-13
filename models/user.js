'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
      this.hasMany(models.Post, {
        sourceKey: 'userId',
        foreignKey: 'UserId',
      });

      this.hasMany(models.Comment, {
        sourceKey: 'userId',
        foreignKey: 'UserId',
      });

      this.hasMany(models.LikesPost, {
        sourceKey: 'userId',
        foreignKey: 'UserId',
      });

      this.hasMany(models.LikesComment, {
        sourceKey: 'userId',
        foreignKey: 'UserId',
      });

      this.hasMany(models.RefreshToken, {
        sourceKey: 'userId',
        foreignKey: 'UserId',
      });

      this.hasMany(models.ProfileImage, {
        sourceKey: 'userId',
        foreignKey: 'UserId',
      });
    }
  }
  User.init(
    {
      userId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      nickname: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      gender: {
        type: DataTypes.STRING,
      },
      interestTopic: {
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};

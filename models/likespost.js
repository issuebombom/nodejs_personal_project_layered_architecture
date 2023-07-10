'use strict';
const { Model } = require('sequelize');
const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LikesPost extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        targetKey: 'userId',
        foreignKey: 'UserId',
        onDelete: 'CASCADE',
      });
      this.belongsTo(models.Post, {
        targetKey: 'postId',
        foreignKey: 'PostId',
        onDelete: 'CASCADE',
      });
    }
  }
  LikesPost.init(
    {
      likesPostId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      UserId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'User',
          key: 'userId',
        },
      },
      PostId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Post',
          key: 'postId',
        },
      },
    },
    {
      sequelize,
      modelName: 'LikesPost',
      timestamps: false,
    }
  );
  return LikesPost;
};

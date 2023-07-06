'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      // define association here
      this.hasMany(models.LikesComment, {
        sourceKey: 'commentId',
        foreignKey: 'CommentId',
      });
      this.belongsTo(models.User, {
        targetKey: 'userId',
        foreignKey: 'UserId',
      });
      this.belongsTo(models.Post, {
        targetKey: 'postId',
        foreignKey: 'PostId',
      });
    }
  }
  Comment.init(
    {
      commentId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      PostId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Post',
          key: 'postId',
        },
        onDelete: 'CASCADE',
      },
      UserId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'User',
          key: 'userId',
        },
        onDelete: 'CASCADE',
      },
      content: {
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
      modelName: 'Comment',
    }
  );
  return Comment;
};

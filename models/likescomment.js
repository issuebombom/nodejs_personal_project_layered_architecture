'use strict';
const { Model } = require('sequelize');
const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LikesComment extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        targetKey: 'userId',
        foreignKey: 'UserId',
      });
      this.belongsTo(models.Comment, {
        targetKey: 'commentId',
        foreignKey: 'CommentId',
      });
    }
  }
  LikesComment.init(
    {
      likesCommentId: {
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
        onDelete: 'CASCADE',
      },
      CommentId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Comment',
          key: 'commentId',
        },
        onDelete: 'CASCADE',
      },
    },
    {
      sequelize,
      modelName: 'LikesComment',
      timestamps: false,
    }
  );
  return LikesComment;
};

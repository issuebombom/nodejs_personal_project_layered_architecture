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
        onDelete: 'CASCADE',
      });
      this.belongsTo(models.Comment, {
        targetKey: 'commentId',
        foreignKey: 'CommentId',
        onDelete: 'CASCADE',
      });
    }
  }
  LikesComment.init(
    {
      likesCommentId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
      },
      UserId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'User',
          key: 'userId',
        },
      },
      CommentId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Comment',
          key: 'commentId',
        },
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

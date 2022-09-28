'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    //associations
    static associate(models) {
     models.Comment.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });

      models.Comment.belongsTo(models.Article, {
        foreignKey: 'articleId',
        as: 'article'
      });

      models.User.belongsToMany(models.Article, {
        through: models.Comment,
        foreignKey: 'userId',
        otherKey: 'articleId',
      });

      models.Article.belongsToMany(models.User, {
        through: models.Comment,
        foreignKey: 'articleId',
        otherKey: 'userId',
      });
      
    }
  };
  Comment.init({
    //ajout articleId et userId pour l'envoi des données
    articleId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};
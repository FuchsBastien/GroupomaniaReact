'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    //associations
    static associate(models) {
     models.Like.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });

      models.Like.belongsTo(models.Article, {
        foreignKey: 'articleId',
        as: 'article'
      });

      /*models.User.belongsToMany(models.Article, {
        through: models.Comment,
        foreignKey: 'userId',
        otherKey: 'articleId',
      });

      models.Article.belongsToMany(models.User, {
        through: models.Comment,
        foreignKey: 'articleId',
        otherKey: 'userId',
      });*/
      
    }
  };
  Like.init({
    //ajout articleId et userId pour l'envoi des données
    articleId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};
'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    //association 
    static associate(models) {
     models.User.hasMany(models.Article, { 
      foreignKey: 'id',
    });
    
  };
};
  
  User.init({
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
    activate: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
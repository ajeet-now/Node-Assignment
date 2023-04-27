'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
    }
  }
  User.init({
    firstName: {
      type: DataTypes.STRING(40),
      allowNull: true,
      validate: {
        notEmpty: true,
        len: [1, 40]
      }
    },
    lastName: {
      type: DataTypes.STRING(40),
      allowNull: true,
      validate: {
        notEmpty: true,
        len: [1, 40]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true
    },
    photo: {
      type: DataTypes.BLOB('long'),
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Otp extends Model {
    static associate(models) {
    }
  }
  Otp.init({
    otp: DataTypes.STRING,
    expiration_date: DataTypes.DATE,
    is_verified: DataTypes.BOOLEAN,
    email: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Otp',
  });
  return Otp;
};
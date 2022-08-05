const { Sequelize, DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
  class User extends Model {
    static associate(models) {
    }
  };
  User.init({
    login: {
      type: DataTypes.STRING,
      defaultValue: 'Noname',
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'Some status...',
    },
    vk: {
      type: DataTypes.STRING,
      defaultValue: -1,
    },
    fb: {
      type: DataTypes.STRING,
      defaultValue: -1,
    },
    google: {
      type: DataTypes.STRING,
      defaultValue: -1,
    },
    twitter: {
      type: DataTypes.STRING,
      defaultValue: -1,
    },
    googleRefresh: {
      type: DataTypes.STRING,
      defaultValue: -1,
    },
  }, {
    sequelize,
    modelName: 'users'
  });
  return User;
}
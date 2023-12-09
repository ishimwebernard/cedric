'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DesignTrack extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DesignTrack.init({
    Description: DataTypes.STRING, //To become a Markdown description
    DesignerEmail: DataTypes.STRING, //To become the email of designer
    CustomerEmail: DataTypes.STRING,
    Status: DataTypes.INTEGER, //approved, under review, rejected
    Files: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'DesignTrack',
  });
  return DesignTrack;
};
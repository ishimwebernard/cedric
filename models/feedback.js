'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Feedback extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Feedback.init({
    DesignId:  DataTypes.INTEGER,
    CustomerEmail: DataTypes.STRING,
    DesignerEmail: DataTypes.STRING,
    CustomerFiles: DataTypes.STRING,
    CustomerText: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Feedback',
  });
  return Feedback;
};
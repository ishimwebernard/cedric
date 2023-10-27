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
    Type: DataTypes.STRING, //To become a Markdown description
    OrganizationName: DataTypes.STRING, //To become the email of designer
    Status: DataTypes.INTEGER,
    Files: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'DesignTrack',
  });
  return DesignTrack;
};
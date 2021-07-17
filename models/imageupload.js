'use strict';
const { 
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ImageUpload extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  ImageUpload.init({
    file: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ImageUpload',
  }); 
  return ImageUpload;
};
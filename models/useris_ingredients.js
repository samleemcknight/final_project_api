'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userIs_ingredients extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  userIs_ingredients.init({
    userId: DataTypes.INTEGER,
    ingredientId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'userIs_ingredients',
  });
  return userIs_ingredients;
};
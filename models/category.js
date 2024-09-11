'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Category.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {msg: 'Category name must be unique'},
      validate: {
        notNull: {msg: 'Category name is required'},
        notEmpty: {msg: 'Category name is required'},
        len: { args: [2, 45], msg: 'Category name must be between 2 and 45 characters'}
      }
    },
    rank: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {msg: 'Category rank is required'},
        notEmpty: {msg: 'Category rank is required'},
        isInt: {msg: 'Category rank must be an integer'},
        min: { args: [1], msg: 'Category rank must be a positive integer'}
      }
    }
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};
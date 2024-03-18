'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Estimate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Estimate.hasMany(models.Note, {foreignKey: 'commentableId', constraints: false, scope: {commentableType: 'estimate'}});
      Estimate.hasMany(models.Document, {foreignKey: 'commentableId', constraints: false, scope: {commentableType: 'estimate'}});
      Estimate.hasMany(models.Link, {foreignKey: 'commentableId', constraints: false, scope: {commentableType: 'estimate'}});
    }
  }
  Estimate.init({
    data_alta: DataTypes.DATE,
    type: DataTypes.STRING,
    subtitle: DataTypes.STRING,
    description: DataTypes.STRING,
    data_vigencia: DataTypes.DATE,
    observacions: DataTypes.STRING,
    num_canvis: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Estimate',
  });
  return Estimate;
};
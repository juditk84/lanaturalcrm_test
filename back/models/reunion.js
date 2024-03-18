'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reunion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Reunion.hasMany(models.Note, {foreignKey: 'commentableId', constraints: false, scope: {commentableType: 'note'}});
      Reunion.hasMany(models.Document, {foreignKey: 'commentableId', constraints: false, scope: {commentableType: 'document'}});
      Reunion.hasMany(models.Link, {foreignKey: 'commentableId', constraints: false, scope: {commentableType: 'link'}});
    }
  }
  Reunion.init({
    title: DataTypes.STRING,
    subtitle: DataTypes.STRING,
    type: DataTypes.ENUM('puntual','recurrent'),
    date: DataTypes.DATE,
    date_recordatori: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Reunion',
  });
  return Reunion;
};
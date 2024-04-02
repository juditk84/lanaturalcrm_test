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

      // commentables
      Reunion.hasMany(models.Note, {foreignKey: 'commentableId', constraints: false, scope: {commentableType: 'reunion'}});
      Reunion.hasMany(models.Document, {foreignKey: 'commentableId', constraints: false, scope: {commentableType: 'reunion'}});
      Reunion.hasMany(models.Link, {foreignKey: 'commentableId', constraints: false, scope: {commentableType: 'reunion'}});

      // as creator
      Reunion.belongsTo(models.Worker, {as: "creator", foreignKey: 'workerId'})
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
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Worker extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Worker.hasMany(models.Document);
      Worker.hasMany(models.Estimate);
      Worker.hasMany(models.Link);
      Worker.hasMany(models.Member);
      Worker.hasMany(models.Note);
      Worker.hasMany(models.Project);
      Worker.hasMany(models.Reunion);
      Worker.hasMany(models.Task);
      Worker.hasMany(models.Transaction);

      Worker.belongsToMany(models.Project, {through: "Projects_Assigned_To_Workers"})
      Worker.belongsToMany(models.Task, {through: "Tasks_Assigned_To_Workers"})
      Worker.belongsToMany(models.Reunion, {through: "Workers_Invited_To_Reunions"})

      Worker.hasMany(models.Note, {foreignKey: 'commentableId', constraints: false, scope: {commentableType: 'worker'}});
      Worker.hasMany(models.Document, {foreignKey: 'commentableId', constraints: false, scope: {commentableType: 'worker'}});
      Worker.hasMany(models.Link, {foreignKey: 'commentableId', constraints: false, scope: {commentableType: 'worker'}});
    }
  }
  Worker.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    firstname: DataTypes.STRING,
    lastname2: DataTypes.STRING,
    lastname1: DataTypes.STRING,
    pronouns: DataTypes.STRING,
    role: DataTypes.STRING,
    officialId: DataTypes.STRING,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Worker',
  });
  return Worker;
};
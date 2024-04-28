'use strict';

const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      // associated to member de la xarxa
      Project.belongsTo(models.Member, {foreignKey: "memberId", allowNull: true});

      // has a project type
      Project.belongsTo(models.ProjectType);

      // associated transactions & estimates
      Project.hasMany(models.Transaction, {foreignKey: "projectId", allowNull: true});
      Project.hasOne(models.Estimate, {foreignKey: "projectId"})

      // associated tasks
      Project.hasMany(models.Task)

      // commentables
      Project.hasMany(models.Note, {foreignKey: 'commentableId', constraints: false, scope: {commentableType: 'project'}});
      Project.hasMany(models.Document, {foreignKey: 'commentableId', constraints: false, scope: {commentableType: 'project'}});
      Project.hasMany(models.Link, {foreignKey: 'commentableId', constraints: false, scope: {commentableType: 'project'}});

      // as creator
      Project.belongsTo(models.Worker, {foreignKey: 'creatorId'})
    }
  }
  Project.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUID.V4,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};
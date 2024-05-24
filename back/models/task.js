'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      Task.belongsTo(models.Project, {foreignKey: "projectId"})

      // tree structure
      Task.belongsTo(models.Task, {as: "parentTask", foreignKey: "parentId"})
      Task.hasMany(models.Task, {as: "subTasks", foreignKey: "parentId"})

      // assigned tasks to worker
      Task.belongsToMany(models.Worker, {through: "Tasks_Assigned_To_Workers"})

      // tasks by project type:
      Task.belongsToMany(models.ProjectType, {through: "Tasks_By_ProjectType"})

      // commentables
      Task.hasMany(models.Note, {foreignKey: 'commentableId', constraints: false, scope: {commentableType: 'task'}});
      Task.hasMany(models.Document, {foreignKey: 'commentableId', constraints: false, scope: {commentableType: 'task'}});
      Task.hasMany(models.Link, {foreignKey: 'commentableId', constraints: false, scope: {commentableType: 'task'}});

      // as creator
      Task.belongsTo(models.Worker, {as: "creator", foreignKey: 'creatorId'})
    }
  }
  Task.init({
    title: DataTypes.STRING,
    startDate: DataTypes.STRING,
    deadline: DataTypes.STRING,
    description: DataTypes.STRING,
    defaultPrice: DataTypes.INTEGER,
    status: DataTypes.ENUM('futur', 'pendent', 'en curs', 'tancat', 'tard')
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};
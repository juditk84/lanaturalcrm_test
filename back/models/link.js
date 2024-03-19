'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Link extends Model {
    uppercaseFirst(str) {
      return `${str[0].toUpperCase()}${str.substr(1)}`;
    }

    getCommentable(options) {
      if (!this.commentableType) return Promise.resolve(null);
      const mixinMethodName = `get${uppercaseFirst(this.commentableType)}`;
      return this[mixinMethodName](options);
    }

    static associate(models) {
      
      // because it's a commentable
      Link.belongsTo(models.Document, { foreignKey: 'commentableId', constraints: false });
      Link.belongsTo(models.Estimate, { foreignKey: 'commentableId', constraints: false });
      Link.belongsTo(models.Link, { foreignKey: 'commentableId', constraints: false });
      Link.belongsTo(models.Member, { foreignKey: 'commentableId', constraints: false });
      Link.belongsTo(models.Project, { foreignKey: 'commentableId', constraints: false });
      Link.belongsTo(models.Reunion, { foreignKey: 'commentableId', constraints: false });
      Link.belongsTo(models.Task, { foreignKey: 'commentableId', constraints: false });
      Link.belongsTo(models.Transaction, { foreignKey: 'commentableId', constraints: false });
      Link.belongsTo(models.Worker, { foreignKey: 'commentableId', constraints: false }); // as a link left for user self

      // as creator
      Link.belongsTo(models.Worker, {as: "creator", foreignKey: 'workerId'})
    }
  }
  Link.init({
    title: DataTypes.STRING,
    url: DataTypes.STRING,
    description: DataTypes.STRING,
    commentableType: DataTypes.STRING,
    commentableId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Link',
  });

  Link.addHook("afterFind", findResult => {
    if (!Array.isArray(findResult)) findResult = [findResult];
    for (const instance of findResult) {
      switch(instance.commentableType) {
        case "document" :
          if (instance.document !== undefined) instance.commentable = instance.document
          break;
        case "estimate" :
          if (instance.estimate !== undefined) instance.commentable = instance.estimate
        break;
        case "link" :
          if (instance.link !== undefined) instance.commentable = instance.link
          break;
        case "member" :
          if (instance.member !== undefined) instance.commentable = instance.member
        break;
        case "project" :
          if (instance.project !== undefined) instance.commentable = instance.project
          break;
        case "reunion" :
          if (instance.reunion !== undefined) instance.commentable = instance.reunion
        break;
        case "task" :
          if (instance.task !== undefined) instance.commentable = instance.task
          break;
        case "transaction" :
          if (instance.transaction !== undefined) instance.commentable = instance.transaction
        break;
        case "worker" :
          if (instance.worker !== undefined) instance.commentable = instance.worker
          break;
      }
      delete instance.document;
      delete instance.dataValues.document;
      delete instance.estimate;
      delete instance.dataValues.estimate;
      delete instance.link;
      delete instance.dataValues.link;
      delete instance.member;
      delete instance.dataValues.member;
      delete instance.project;
      delete instance.dataValues.project;
      delete instance.reunion;
      delete instance.dataValues.reunion;
      delete instance.task;
      delete instance.dataValues.transaction;
      delete instance.worker;
      delete instance.dataValues.worker;
    }
  });

  return Link;
};
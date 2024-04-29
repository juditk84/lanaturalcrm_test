'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      // tree structure
      Member.belongsTo(models.Member, {as: "Parent", foreignKey: "parentId", allowNull: true});
      Member.hasMany(models.Member, {as: "LinkedMembers", foreignKey: "parentId"})

      // commentables
      Member.hasMany(models.Note, {foreignKey: 'commentableId', constraints: false, scope: {commentableType: 'member'}});
      Member.hasMany(models.Document, {foreignKey: 'commentableId', constraints: false, scope: {commentableType: 'member'}});
      Member.hasMany(models.Link, {foreignKey: 'commentableId', constraints: false, scope: {commentableType: 'member'}});

      // as creator
      Member.belongsTo(models.Worker, {as: "creator", foreignKey: 'creatorId'})
    }
  }
  Member.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUID.V4,
      primaryKey: true,
    },
    firstname: DataTypes.STRING,
    lastname1: DataTypes.STRING,
    lastname2: DataTypes.STRING,
    commercialName1: DataTypes.STRING,
    commercialName2: DataTypes.STRING,
    pronouns: DataTypes.STRING,
    role: DataTypes.STRING,
    officialId: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    postcode: DataTypes.STRING,
    country: DataTypes.STRING,
    phoneNumber: DataTypes.INTEGER,
    authorizationImg: DataTypes.BOOLEAN,
    memberType: DataTypes.ENUM('entity', 'contact'),
  }, {
    sequelize,
    modelName: 'Member',
    // validate: {
    //   nameMatchesMemberType() {
    //     if ((this.memberType === 'entity') === (this.commercialName1 === null)) {
    //       throw new Error('Les entitats han de tenir com a mínim un nom commercial.');
    //     }
    //     if ((this.memberType === 'contact') === ((this.firstname === null) === (this.firstname1 === null))) {
    //       throw new Error('Membres de la xarxa han de tenir com a mínim un nom o un cognóm.');
    //     }
    //   }
    // }
  });
  return Member;
};
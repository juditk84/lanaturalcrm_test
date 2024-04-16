'use strict';

const { v4: uuidv4 } = require('uuid')


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Documents', [
      {
        id: "a169a003-eb64-4e8d-9ae1-4afb5b621d71",
        title: "Document 1",
        url: "URL for document 1",
        description: "description for document 1",
        commentableType: "worker",
        commentableId: "jajaja",
        creatorId: "74114925-269f-4f44-89bd-6d9259847489",
        createdAt: new Date(),
        updatedAt: new Date()
      }])
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Documents', null, {});
  }
};

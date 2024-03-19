'use strict';

const { v4: uuidv4 } = require('uuid')


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Projects_Assigned_To_Workers', [
      {
        id: "9dc0ca6d-2fc1-48b7-9944-36174b82fcb3",
        ProjectId: "837c6321-e1f3-4c25-86fe-de028bfe3149",
        WorkerId: "74114925-269f-4f44-89bd-6d9259847489",
        createdAt: new Date(),
        updatedAt: new Date()
      }])
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Projects_Assigned_To_Workers', null, {});
  }
};

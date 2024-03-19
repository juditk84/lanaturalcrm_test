'use strict';

const { v4: uuidv4 } = require('uuid')


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   

    await queryInterface.bulkInsert('Notes', [
      {
        id: "08e2e87a-7e31-46e8-9abd-037bc4d931db",
        title: "Note 1",
        text: "text for Note 1",
        commentableType: "worker",
        commentableId: "74114925-269f-4f44-89bd-6d9259847489",
        createdAt: new Date(),
        updatedAt: new Date()
      }])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Transactions', null, {});
  }
};

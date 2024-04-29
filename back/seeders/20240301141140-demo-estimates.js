'use strict';

const { v4: uuidv4 } = require('uuid')


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Estimates', [
      {
        id: "d0e9c19d-2a32-4fda-aad1-5335e61f6c8b",
        data_alta: "2024-03-19 11:22:50",
        type: "tipus 1",
        subtitle: "subtitle? No hi ha title al model?",
        description: "descripció del pressupost 1",
        data_vigencia: "2024-05-19 11:22:50",
        observacions: "Observacions del pressupost.",
        num_canvis: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }])
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Estimates', null, {});
  }
};

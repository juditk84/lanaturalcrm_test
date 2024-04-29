'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.bulkInsert('ProjectTypes', [
      {
        type: "Disseny Gràfic",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        type: "Disseny Web",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        type: "Xarxes Socials",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        type: "Comunicació",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        type: "Gestió",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        type: "IT",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    
    
    ], {});

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ProjectTypes', null, {})
  }
};

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'Projects',
      'deadline',
      {
        type: Sequelize.DATE,
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        
      }
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      'Projects', 'deadline'
    )
  }
};

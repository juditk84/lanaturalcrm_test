'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      "Estimates",
      "projectId",
      {
        type: Sequelize.UUID,
        references: {
          model: "Projects",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      }
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      "Estimates", "projectId"
    )
  }
};

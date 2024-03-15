'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      "Users",
      "WorkerId",
      {
        type: Sequelize.UUID,
        references: {
          model: "Workers",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      }
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      "Users", "WorkerId"
    )
  }
};

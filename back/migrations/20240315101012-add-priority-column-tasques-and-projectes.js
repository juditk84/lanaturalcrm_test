'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      "Tasks",
      "priority",
      {
        type: Sequelize.ENUM('baixa', 'mitja', 'alta'),
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      }
    );
    await queryInterface.addColumn(
      "Projects",
      "priority",
      {
        type: Sequelize.ENUM('baixa', 'mitja', 'alta'),
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
      }
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("Tasks", "priority");
    await queryInterface.removeColumn("Projects", "priority")
  }
};

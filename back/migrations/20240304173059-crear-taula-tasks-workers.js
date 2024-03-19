'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Tasks_Assigned_To_Workers', {
      TaskId: {
        type: Sequelize.UUID,
        references: {
          model: "Tasks",
          key: "id",
        },
        allowNull:false,
      },
      workerId: {
        type: Sequelize.UUID,
        references: {
          model: "Workers",
          key: "id",
        },
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("Tasks_Assigned_To_Workers")
  
  }
};

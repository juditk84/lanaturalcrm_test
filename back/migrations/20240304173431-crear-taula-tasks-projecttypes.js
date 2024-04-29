'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Tasks_By_ProjectType', {
      TaskId: {
        type: Sequelize.UUID,
        references: {
          model: "Tasks",
          key: "id",
        },
     
      },
      ProjectTypeId: {
        type: Sequelize.INTEGER,
        references: {
          model: "ProjectTypes",
          key: "id",
        },

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
    await queryInterface.dropTable("Tasks_By_ProjectType")
  
  }
};

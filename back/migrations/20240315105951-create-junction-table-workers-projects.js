'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("Projects_Assigned_To_Workers", {    

    projectId: {
      type: Sequelize.UUID,
      references: {
        model: "Projects",
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
    }}
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("Projects_Assigned_To_Workers")
  }
};

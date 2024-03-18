'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("Members_Invited_To_Reunions", {
      MemberId: {
        type: Sequelize.UUID,
        references: {
          model: "Members",
          key: "id",
        },
        allowNull:false,
      },
      ReunionId: {
        type: Sequelize.UUID,
        references: {
          model: "Reunions",
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
    await queryInterface.createTable("Workers_Invited_To_Reunions", {
      WorkerId: {
        type: Sequelize.UUID,
        references: {
          model: "Workers",
          key: "id",
        },
        allowNull: false,
      },
      ReunionId: {
        type: Sequelize.UUID,
        references: {
          model: "Reunions",
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
    await queryInterface.dropTable("Workers_Invited_To_Reunions");
    await queryInterface.dropTable("Members_Invited_To_Reunions")
  }
};

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.addColumn("Documents", 
      "WorkerId",
      {
        type: Sequelize.UUID,
        references: {
          model: "Workers",
          key: "id",
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    ),

    await queryInterface.addColumn("Estimates",
      "WorkerId",
      {
        type: Sequelize.UUID,
        references: {
          model: "Workers",
          key: "id",
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    ),
    await queryInterface.addColumn("Links",
      "WorkerId",
      {
        type: Sequelize.UUID,
        references: {
          model: "Workers",
          key: "id",
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    ),
    await queryInterface.addColumn("Members", 
      "WorkerId",
      {
        type: Sequelize.UUID,
        references: {
          model: "Workers",
          key: "id",
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    ),
    await queryInterface.addColumn("Reunions", 
      "WorkerId",
      {
        type: Sequelize.UUID,
        references: {
          model: "Workers",
          key: "id",
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    ),
    await queryInterface.addColumn("Tasks",       
      "WorkerId",
      {
        type: Sequelize.UUID,
        references: {
          model: "Workers",
          key: "id",
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    ),
    await queryInterface.addColumn("Transactions", 
      "WorkerId",
      {
        type: Sequelize.UUID,
        references: {
          model: "Workers",
          key: "id",
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    ),
    await queryInterface.addColumn("Projects", 
      "WorkerId",
      {
        type: Sequelize.UUID,
        references: {
          model: "Workers",
          key: "id",
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    ),
    await queryInterface.addColumn("Notes",
      "WorkerId",
      {
        type: Sequelize.UUID,
        references: {
          model: "Workers",
          key: "id",
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("Notes", "WorkerId");
    await queryInterface.removeColumn("Projects", "WorkerId")
    await queryInterface.removeColumn("Reunions", "WorkerId")
    await queryInterface.removeColumn("Transactions", "WorkerId")
    await queryInterface.removeColumn("Tasks", "WorkerId")
    await queryInterface.removeColumn("Members", "WorkerId")
    await queryInterface.removeColumn("Links", "WorkerId")
    await queryInterface.removeColumn("Estimates", "WorkerId")
    await queryInterface.removeColumn("Documents", "WorkerId")
  }
};

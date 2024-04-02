'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.addColumn("Documents", 
      "workerId",
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
      "workerId",
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
      "workerId",
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
      "workerId",
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
      "workerId",
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
      "workerId",
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
      "workerId",
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
      "workerId",
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
    await queryInterface.addColumn("Notes",
      "workerId",
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
    await queryInterface.removeColumn("Notes", "creator");
    await queryInterface.removeColumn("Projects", "creator")
    await queryInterface.removeColumn("Reunions", "creator")
    await queryInterface.removeColumn("Transactions", "creator")
    await queryInterface.removeColumn("Tasks", "creator")
    await queryInterface.removeColumn("Members", "creator")
    await queryInterface.removeColumn("Links", "creator")
    await queryInterface.removeColumn("Estimates", "creator")
    await queryInterface.removeColumn("Documents", "creator")
  }
};

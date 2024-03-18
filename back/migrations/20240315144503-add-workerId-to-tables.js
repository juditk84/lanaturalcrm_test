'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.addColumn("Documents", 
      "creator",
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
      "creator",
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
      "creator",
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
      "creator",
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
      "creator",
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
      "creator",
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
      "creator",
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
      "creator",
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
      "creator",
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

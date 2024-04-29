'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.addColumn("Documents", 
      "creatorId",
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
      "creatorId",
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
      "creatorId",
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
      "creatorId",
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
      "creatorId",
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
      "creatorId",
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
      "creatorId",
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
      "creatorId",
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
      "creatorId",
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
    await queryInterface.removeColumn("Notes", "creatorId");
    await queryInterface.removeColumn("Projects", "creatorId")
    await queryInterface.removeColumn("Reunions", "creatorId")
    await queryInterface.removeColumn("Transactions", "creatorId")
    await queryInterface.removeColumn("Tasks", "creatorId")
    await queryInterface.removeColumn("Members", "creatorId")
    await queryInterface.removeColumn("Links", "creatorId")
    await queryInterface.removeColumn("Estimates", "creatorId")
    await queryInterface.removeColumn("Documents", "creatorId")
  }
};

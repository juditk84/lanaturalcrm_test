'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tasks', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      title: {
        type: Sequelize.STRING
      },
      color: {
        type: Sequelize.STRING
      },
      startDate: {
        type: Sequelize.DATE
      },
      deadline: {
        type: Sequelize.DATE
      },
      description: {
        type: Sequelize.STRING
      },
      defaultPrice: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.ENUM('futur', 'pendent', 'en curs', 'tancat', 'tard')
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Tasks');
  }
};
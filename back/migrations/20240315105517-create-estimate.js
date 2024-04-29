'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Estimates', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      data_alta: {
        type: Sequelize.DATE
      },
      type: {
        type: Sequelize.STRING
      },
      subtitle: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      data_vigencia: {
        type: Sequelize.DATE
      },
      observacions: {
        type: Sequelize.STRING
      },
      num_canvis: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Estimates');
  }
};
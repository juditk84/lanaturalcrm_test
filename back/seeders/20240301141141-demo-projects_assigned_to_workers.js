'use strict';

const { v4: uuidv4 } = require('uuid')


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Projects_Assigned_To_Workers', [
      {
        id: "9dc0ca6d-2fc1-48b7-9944-36174b82fcb3",
        ProjectId: "837c6321-e1f3-4c25-86fe-de028bfe3149", //whackamole
        workerId: "74114925-269f-4f44-89bd-6d9259847489", // la Juju
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "9dc0ca6d-2fc1-48b7-9944-36174b82agb4",
        ProjectId: "837c6321-e1f3-4c25-86fe-de028bfe3529", //derrumbar sistema
        workerId: "94b5c901-57a1-41cf-a81c-45a3b3fcb3dc", // l'Iris
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "9dc0ca6d-2fc1-48b7-9944-36174b82fgf4",
        ProjectId: "837c6321-e1f3-4c25-86fe-de028bfe3149", //whackamole
        workerId: "94b5c901-57a1-41cf-a81c-45a3b3fcb3dc", // l'iris
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "9dc0ca6d-2fc1-48b7-9944-36174b82fgf4",
        ProjectId: "837c6321-e1f3-4c25-86fe-de028bfe3222", // temps de qualitat
        workerId: "74114925-269f-4f44-89bd-6d9259847489", // juju
        createdAt: new Date(),
        updatedAt: new Date()
      },


    ])
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Projects_Assigned_To_Workers', null, {});
  }
};

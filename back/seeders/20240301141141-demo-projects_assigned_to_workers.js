'use strict';


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Projects_Assigned_To_Workers', [
      {
        projectId: "837c6321-e1f3-4c25-86fe-de028bfe3149", // CRM
        workerId: "74114925-269f-4f44-89bd-6d9259847489", // la Juju
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        projectId: "837c6321-e1f3-4c25-86fe-de028bfe3529", // derrumbar sistema
        workerId: "94b5c901-57a1-41cf-a81c-45a3b3fcb3dc", // la Iris
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        projectId: "837c6321-e1f3-4c25-86fe-de028bfe3529", // derrumbar sistema
        workerId: "74114925-269f-4f44-89bd-6d9259847489", // la Juju
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        projectId: "837c6321-e1f3-4c25-86fe-de028bfe3529", // derrumbar sistema
        workerId: "9074884e-c8ab-4632-88de-cc7bf21b2364", // l'Elena
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        projectId: "837c6321-e1f3-4c25-86fe-de028bfe3529", // derrumbar sistema
        workerId: "83482ffe-63d1-403c-83d5-a70dd01ae597", // l'Ana Belén
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        projectId: "837c6321-e1f3-4c25-86fe-de028bfe3529", // derrumbar sistema
        workerId: "40c86a5e-11af-4a35-b313-1f8b0d4e71a2", // la Laura
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        projectId: "837c6321-e1f3-4c25-86fe-de028bfe3529", // derrumbar sistema
        workerId: "137ae8d7-9c8e-40ec-a590-0f912e658d20", // la Irene
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        projectId: "837c6321-e1f3-4c25-86fe-de028bfe3529", // derrumbar sistema
        workerId: "46c4f6ca-026a-4581-bcf1-af5b7eeb0dab", // la Francina
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        projectId: "837c6321-e1f3-4c25-86fe-de028bfe3149", // CRM
        workerId: "94b5c901-57a1-41cf-a81c-45a3b3fcb3dc", // la Iris
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        projectId: "837c6321-e1f3-4c25-86fe-de028bfe3222", // ex-presos
        workerId: "46c4f6ca-026a-4581-bcf1-af5b7eeb0dab", // la Francina
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        projectId: "56d3427e-000f-46d6-a8d9-13c4cc2950ef", // BIBOBLETS
        workerId: "9074884e-c8ab-4632-88de-cc7bf21b2364", // l'Elena
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        projectId: "400f5c11-64a0-46b5-8e0c-d1d57ebf0022", // ESTRUCTURA
        workerId: "83482ffe-63d1-403c-83d5-a70dd01ae597", // l'Ana Belén
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        projectId: "ccd0571e-a431-467b-b770-5652b0426815", // EXCEL
        workerId: "74114925-269f-4f44-89bd-6d9259847489", // la Juju
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        projectId: "ccd0571e-a431-467b-b770-5652b0426815", // EXCEL
        workerId: "40c86a5e-11af-4a35-b313-1f8b0d4e71a2", // la Laura
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Projects_Assigned_To_Workers', null, {});
  }
};

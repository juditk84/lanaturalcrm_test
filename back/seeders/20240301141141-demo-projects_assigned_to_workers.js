'use strict';


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Projects_Assigned_To_Workers', [
      {
        id: "9dc0ca6d-2fc1-48b7-9944-36174b82fcb3",
        ProjectId: "837c6321-e1f3-4c25-86fe-de028bfe3149", // CRM
        workerId: "74114925-269f-4f44-89bd-6d9259847489", // la Juju
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "d815bc4b-101c-4134-92e1-378a1cc1eea0",
        ProjectId: "837c6321-e1f3-4c25-86fe-de028bfe3529", // derrumbar sistema
        workerId: "94b5c901-57a1-41cf-a81c-45a3b3fcb3dc", // la Iris
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "4e3ac429-4dbc-41e7-99cb-18b90de099a4",
        ProjectId: "837c6321-e1f3-4c25-86fe-de028bfe3529", // derrumbar sistema
        workerId: "74114925-269f-4f44-89bd-6d9259847489", // la Juju
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "b2d5c667-efe6-4590-b0cd-6a4673e32533",
        ProjectId: "837c6321-e1f3-4c25-86fe-de028bfe3529", // derrumbar sistema
        workerId: "9074884e-c8ab-4632-88de-cc7bf21b2364", // l'Elena
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "a6ccbf60-204d-4d0b-8e68-3bfc7ba7de00",
        ProjectId: "837c6321-e1f3-4c25-86fe-de028bfe3529", // derrumbar sistema
        workerId: "83482ffe-63d1-403c-83d5-a70dd01ae597", // l'Ana Belén
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "c4dc7a6a-b94c-47b4-9351-0a6a9c3de5b3",
        ProjectId: "837c6321-e1f3-4c25-86fe-de028bfe3529", // derrumbar sistema
        workerId: "40c86a5e-11af-4a35-b313-1f8b0d4e71a2", // la Laura
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "6f5398c8-1d6c-4c48-9b43-c1a0082219ad",
        ProjectId: "837c6321-e1f3-4c25-86fe-de028bfe3529", // derrumbar sistema
        workerId: "137ae8d7-9c8e-40ec-a590-0f912e658d20", // la Irene
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "9436a32b-1f61-4c4d-80d4-4eb74d4ebc36",
        ProjectId: "837c6321-e1f3-4c25-86fe-de028bfe3529", // derrumbar sistema
        workerId: "46c4f6ca-026a-4581-bcf1-af5b7eeb0dab", // la Francina
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "1de09d6f-4d32-40cb-88ac-44643cfeb059",
        ProjectId: "837c6321-e1f3-4c25-86fe-de028bfe3149", // CRM
        workerId: "94b5c901-57a1-41cf-a81c-45a3b3fcb3dc", // la Iris
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "d0c0a69f-1549-469f-9e0a-02d519a13292",
        ProjectId: "837c6321-e1f3-4c25-86fe-de028bfe3222", // ex-presos
        workerId: "46c4f6ca-026a-4581-bcf1-af5b7eeb0dab", // la Francina
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "0e38592b-b660-4b74-98c9-32a100bab44b",
        ProjectId: "56d3427e-000f-46d6-a8d9-13c4cc2950ef", // BIBOBLETS
        workerId: "9074884e-c8ab-4632-88de-cc7bf21b2364", // l'Elena
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "87b6f8c0-9242-4a2c-a3b0-214fc4de7d85",
        ProjectId: "400f5c11-64a0-46b5-8e0c-d1d57ebf0022", // ESTRUCTURA
        workerId: "83482ffe-63d1-403c-83d5-a70dd01ae597", // l'Ana Belén
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "97f13568-5896-4c6c-8ad9-2bfe455a8e6d",
        ProjectId: "ccd0571e-a431-467b-b770-5652b0426815", // EXCEL
        workerId: "74114925-269f-4f44-89bd-6d9259847489", // la Juju
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "7c885dc6-5c06-4344-bc71-307ed6208180",
        ProjectId: "ccd0571e-a431-467b-b770-5652b0426815", // EXCEL
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

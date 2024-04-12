'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('Tasks_Assigned_To_Workers', [
      {
        taskId: "ed98e956-a686-4877-aec9-6c4c43e01d85", //primer esboss
        workerId: "74114925-269f-4f44-89bd-6d9259847489", // la Juju
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        taskId: "ed98e956-a686-4877-aec9-6c4c43e01d85", //primer esboss
        workerId: "94b5c901-57a1-41cf-a81c-45a3b3fcb3dc", // la Iris
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        taskId: "ed98e956-a686-4877-aec9-6c4c43e01d88", // parlar amb gats, child task of primer esboss
        workerId: "94b5c901-57a1-41cf-a81c-45a3b3fcb3dc", // la Iris
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        taskId: "ed98e956-a686-4877-aec9-6c4c43e01d88", // parlar amb gats, child task of primer esboss
        workerId: "74114925-269f-4f44-89bd-6d9259847489", // la Juju
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        taskId: "ed98e956-a686-4877-aec9-6c4c43e01d86", // respondre al client
        workerId: "74114925-269f-4f44-89bd-6d9259847489", // la Juju
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        taskId: "ed98e956-a686-4877-aec9-6c4c43e01d86", // respondre al client
        workerId: "94b5c901-57a1-41cf-a81c-45a3b3fcb3dc", // la Iris
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        taskId: "ed98e956-a686-4877-aec9-6c4c43e01d87", // imprimir
        workerId: "74114925-269f-4f44-89bd-6d9259847489", // la Juju
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        taskId: "ed98e956-a686-4877-aec9-6c4c43e01d87", // imprimir
        workerId:  "94b5c901-57a1-41cf-a81c-45a3b3fcb3dc", // la Iris
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        taskId: "ed98e956-a686-4877-aec9-6c4c43e01d89", // festa
        workerId: "74114925-269f-4f44-89bd-6d9259847489", // la Juju
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        taskId: "ed98e956-a686-4877-aec9-6c4c43e01d89", // festa
        workerId: "94b5c901-57a1-41cf-a81c-45a3b3fcb3dc", // la Iris
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        taskId: "ed98e956-a686-4877-aec9-6c4c43e01d85", //primer esboss
        workerId: "9074884e-c8ab-4632-88de-cc7bf21b2364", // l'Elena
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        taskId: "ed98e956-a686-4877-aec9-6c4c43e01d84", // **  facturar
        workerId: "83482ffe-63d1-403c-83d5-a70dd01ae597", // l'Ana Belén
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        taskId: "ed98e956-a686-4877-aec9-6c4c43e01d87", // imprimir
        workerId: "40c86a5e-11af-4a35-b313-1f8b0d4e71a2", // la Laura
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        taskId: "ed98e956-a686-4877-aec9-6c4c43e01d86", // respondre al client
        workerId: "137ae8d7-9c8e-40ec-a590-0f912e658d20", // la Irene
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        taskId: "ed98e956-a686-4877-aec9-6c4c43e01d89", // festa
        workerId: "46c4f6ca-026a-4581-bcf1-af5b7eeb0dab", // la Francina
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tasks_Assigned_To_Workers', null, {});

  }
};

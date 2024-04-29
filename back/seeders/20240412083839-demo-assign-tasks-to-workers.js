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
      {
        taskId: "a6751e23-a929-4500-8e32-be0ddb0d4029", 
        workerId: "9074884e-c8ab-4632-88de-cc7bf21b2364", // Elena
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        taskId: "412f79fb-8b35-484c-8ecc-f27ce7d1a12d", 
        workerId: "9074884e-c8ab-4632-88de-cc7bf21b2364", // Elena
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        taskId: "eb1ac0d9-eafc-448f-8b9a-5a687746666e", 
        workerId: "9074884e-c8ab-4632-88de-cc7bf21b2364", // Elena
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        taskId: "ea380761-ba9e-4067-8169-7735a92c29d2", 
        workerId: "46c4f6ca-026a-4581-bcf1-af5b7eeb0dab", // Francina
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        taskId: "60f2c1dd-a278-4a21-8b7a-301051d9423c", 
        workerId: "94b5c901-57a1-41cf-a81c-45a3b3fcb3dc", // la Iris
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        taskId: "60f2c1dd-a278-4a21-8b7a-301051d9423c", 
        workerId: "74114925-269f-4f44-89bd-6d9259847489", // la Juju
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        taskId: "38eaeb54-9c74-44e9-9399-eba44cf716fb", 
        workerId: "74114925-269f-4f44-89bd-6d9259847489", // la Juju
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        taskId: "38eaeb54-9c74-44e9-9399-eba44cf716fb", 
        workerId: "94b5c901-57a1-41cf-a81c-45a3b3fcb3dc", // la Iris
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        taskId: "40a85887-022d-4097-8930-0f5be4ac55c2", 
        workerId: "74114925-269f-4f44-89bd-6d9259847489", // la Iris
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        taskId: "40a85887-022d-4097-8930-0f5be4ac55c2", 
        workerId: "94b5c901-57a1-41cf-a81c-45a3b3fcb3dc", // la Iris
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tasks_Assigned_To_Workers', null, {});

  }
};

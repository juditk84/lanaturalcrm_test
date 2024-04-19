'use strict';

const { v4: uuidv4 } = require('uuid')


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Transactions', [
      {
        id: "58a7331f-ec3c-4a43-9bc1-472706575828",
        transactionRef: 'FACT_001',
        description: "Despesa genèrica 1",
        date: '2024-03-01 10:53:25',
        base: -300,
        irpf: 19,
        status: "tancada",
        transactionType: "factura",
        isRecurrent: false,
        categoryId: 2,
        tipusIVAId: 1,
        projectId: "837c6321-e1f3-4c25-86fe-de028bfe3149",
        memberId: "a0ff9e3d-2bc0-4e95-bdea-e7eb3028f4c1",
        creatorId: "74114925-269f-4f44-89bd-6d9259847489",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { 
        id: "db3bdc18-ae29-4a7d-b48d-1a3b891985ab",
        transactionRef: 'LANATURAL3331',
        description: "Despesa genèrica again",
        date: '2024-02-01 10:53:25',
        base: -135,
        irpf: 19,
        status: "tancada",
        transactionType: "factura",
        isRecurrent: false,
        categoryId: 2,
        tipusIVAId: 1,
        projectId: "837c6321-e1f3-4c25-86fe-de028bfe3149",
        memberId: "a0ff9e3d-2bc0-4e95-bdea-e7eb3028f4c1",
        creatorId: "74114925-269f-4f44-89bd-6d9259847489",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { 
        id: "98e9ca27-5d13-4a9c-9039-38df995b05ea",
        transactionRef: 'SUBVENCIÓ_BRUIXIT',
        description: "Subvenció projecte Bruixit",
        date: '2024-02-01 10:53:25',
        base: 50000,
        irpf: 19,
        status: "tancada",
        transactionType: "subvenció",
        isRecurrent: false,
        categoryId: 2,
        tipusIVAId: 1,
        projectId: "837c6321-e1f3-4c25-86fe-de028bfe3149",
        memberId: "e226996f-5d4d-4bf2-9969-739e62e6d12a",
        creatorId: "74114925-269f-4f44-89bd-6d9259847489",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('Transactions', null, {});
  }
};

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
      },
      { 
        id: "e3e61b38-59cd-4710-b2c7-5ef81b2224d1",
        transactionRef: 'LANATURAL3333',
        description: "Bolis",
        date: '2024-02-01 10:53:25',
        base: -15,
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
        id: "cd44140c-9d3d-49f6-90ae-809b14f5187f",
        transactionRef: 'LANATURAL3334',
        description: "MOLTÍSSIMS Bolis",
        date: '2024-02-01 10:53:25',
        base: -354,
        irpf: 19,
        status: "tancada",
        transactionType: "factura",
        isRecurrent: false,
        categoryId: 2,
        tipusIVAId: 1,
        projectId: "837c6321-e1f3-4c25-86fe-de028bfe3149", // CRM
        memberId: "a0ff9e3d-2bc0-4e95-bdea-e7eb3028f4c1", // Abakooze
        creatorId: "74114925-269f-4f44-89bd-6d9259847489", // Ana Belén
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { 
        id: "9c914a8a-3374-4aef-abce-1c464f1027a6",
        transactionRef: 'fact-003',
        description: "càtering reunió d'inici",
        date: '2024-02-01 10:53:25',
        base: -130,
        irpf: 19,
        status: "tancada",
        transactionType: "factura",
        isRecurrent: false,
        categoryId: 2,
        tipusIVAId: 1,
        projectId: "56d3427e-000f-46d6-a8d9-13c4cc2950ef", // Biboblets
        memberId: "d3c92e9c-b840-43b6-b84e-e7a84f8ea595", // Talló
        creatorId: "74114925-269f-4f44-89bd-6d9259847489", // Ana Belén
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { 
        id: "44dbaa48-511a-4adb-9429-2ad4864d43a7",
        transactionRef: 'BIBOBLETS_001',
        description: "lloguer sala de reunions",
        date: '2024-02-01 10:53:25',
        base: -35,
        irpf: 19,
        status: "tancada",
        transactionType: "factura",
        isRecurrent: false,
        categoryId: 2,
        tipusIVAId: 1,
        projectId: "56d3427e-000f-46d6-a8d9-13c4cc2950ef", // Biboblets
        memberId: "58d7c496-f5d6-402e-858e-c50db7eafcf8", 
        creatorId: "74114925-269f-4f44-89bd-6d9259847489", // Ana Belén
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { 
        id: "f36eb235-b2ea-4eeb-9ebd-9e4d2f90b0d6",
        transactionRef: 'RR33BB_008',
        description: "primer pagament Biboblets",
        date: '2024-02-01 10:53:25',
        base: 450,
        irpf: 19,
        status: "tancada",
        transactionType: "factura",
        isRecurrent: false,
        categoryId: 2,
        tipusIVAId: 1,
        projectId: "56d3427e-000f-46d6-a8d9-13c4cc2950ef", // Biboblets
        memberId: "e226996f-5d4d-4bf2-9969-739e62e6d12a", // Talló
        creatorId: "74114925-269f-4f44-89bd-6d9259847489", // Ana Belén
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { 
        id: "070102a8-95fc-4180-9789-40cb89a92715",
        transactionRef: '44#389',
        description: "impresió enorme tamaño llençol de llit gros",
        date: '2024-02-01 10:53:25',
        base: -30,
        irpf: 19,
        status: "tancada",
        transactionType: "factura",
        isRecurrent: false,
        categoryId: 2,
        tipusIVAId: 1,
        projectId: "56d3427e-000f-46d6-a8d9-13c4cc2950ef", // Biboblets
        memberId: "1e271fc4-4718-43ee-9d80-849915fbbf6b", // Talló
        creatorId: "74114925-269f-4f44-89bd-6d9259847489", // Ana Belén
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('Transactions', null, {});
  }
};

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Tasks', [
      {
        id: "ed98e956-a686-4877-aec9-6c4c43e01d84", // facturar
        title: "facturar",
        description: "",
        defaultPrice: 0.5,
        startDate: '2024-06-05 23:34:00',
        deadline: '2024-06-10 23:34:00',
        status: 'tard',
        priority: 'alta',
        parentId: null,
        projectId: "837c6321-e1f3-4c25-86fe-de028bfe3529", // derrumbar sistema
        creatorId: "74114925-269f-4f44-89bd-6d9259847489", // Juju
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "ed98e956-a686-4877-aec9-6c4c43e01d85", //primer esboss
        title: "primer esboss",
        description: "no oblidar integrar Gats",
        defaultPrice: 1,
        startDate: '2024-08-11 23:34:00',
        deadline: '2024-08-19 23:34:00',
        status: 'en curs',
        priority: 'mitja',
        parentId: null,
        projectId: "837c6321-e1f3-4c25-86fe-de028bfe3529", // derrumbar sistema
        creatorId: "74114925-269f-4f44-89bd-6d9259847489", // Juju
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "ed98e956-a686-4877-aec9-6c4c43e01d86", // respondre al client
        title: "respondre al client",
        description: "ens ha trucat perquè vol noticies",
        defaultPrice: 2,
        startDate: '2024-08-01 23:34:00',
        deadline: '2024-08-06 23:34:00',
        status: 'tancat',
        priority: 'baixa',
        parentId: null,
        projectId: "837c6321-e1f3-4c25-86fe-de028bfe3149", // CRM
        creatorId: "94b5c901-57a1-41cf-a81c-45a3b3fcb3dc", // soc l'iris
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "40a85887-022d-4097-8930-0f5be4ac55c2", 
        title: "Disseny de Frontend / user flow",
        description: "Frontend architecture and userflow structured in a readable way (FIGMA maybe)",
        defaultPrice: 0.5,
        startDate: '2024-02-01 23:34:00',
        deadline: '2024-03-01 23:34:00',
        status: 'tard',
        priority: 'alta',
        parentId: null,
        projectId: "837c6321-e1f3-4c25-86fe-de028bfe3149", // CRM
        creatorId: "74114925-269f-4f44-89bd-6d9259847489", // Juju
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "60f2c1dd-a278-4a21-8b7a-301051d9423c", 
        title: "Database schema",
        description: "Esquematització de la Base de Dades relacional.",
        defaultPrice: 0.5,
        startDate: '2024-02-01 23:34:00',
        deadline: '2024-03-01 23:34:00',
        status: 'tard',
        priority: 'alta',
        parentId: null,
        projectId: "837c6321-e1f3-4c25-86fe-de028bfe3149", // CRM
        creatorId: "94b5c901-57a1-41cf-a81c-45a3b3fcb3dc", // Iris
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "38eaeb54-9c74-44e9-9399-eba44cf716fb", 
        title: "Frontend template and Backend Sequelize scaffolding",
        description: "Scaffolding of the VUE3+Tailwind Vite app and Express.js / Sequelize backend",
        defaultPrice: 0.5,
        startDate: '2024-02-15 23:34:00',
        deadline: '2024-02-25 23:34:00',
        status: 'tard',
        priority: 'alta',
        parentId: null,
        projectId: "837c6321-e1f3-4c25-86fe-de028bfe3149", // CRM
        creatorId: "74114925-269f-4f44-89bd-6d9259847489", // Juju
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "ed98e956-a686-4877-aec9-6c4c43e01d87", // imprimir
        title: "imprimir disseny",
        description: "Imprimer el disseny en un format acceptable per presentar en brut al client.",
        defaultPrice: 3,
        startDate: '2024-07-06 23:34:00',
        deadline: '2024-07-10 23:34:00',
        status: 'futur',
        priority: 'alta',
        parentId: null,
        projectId: "837c6321-e1f3-4c25-86fe-de028bfe3529", // derrumbar sistema
        creatorId: "94b5c901-57a1-41cf-a81c-45a3b3fcb3dc", // soc l'iris
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "ed98e956-a686-4877-aec9-6c4c43e01d88", // parlar amb gats, child task of primer esboss
        title: "conferir amb gats",
        description: "preguntar-lis com volen que els representin",
        defaultPrice: 3,
        startDate: '2024-07-01 23:34:00',
        deadline: '2024-07-05 23:34:00',
        status: 'pendent',
        priority: 'mitja',
        parentId: "ed98e956-a686-4877-aec9-6c4c43e01d85",
        projectId: "837c6321-e1f3-4c25-86fe-de028bfe3529", // derrumbar sistema
        creatorId: "94b5c901-57a1-41cf-a81c-45a3b3fcb3dc", // soc l'iris
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "ed98e956-a686-4877-aec9-6c4c43e01d89", // festa
        title: "organitzar festa",
        description: "enviar mail massiu + invitar els gats en persona",
        defaultPrice: 3,
        startDate: '2024-07-20 23:34:00',
        deadline: '2024-07-25 23:34:00',
        status: 'futur',
        priority: 'alta',
        parentId: "ed98e956-a686-4877-aec9-6c4c43e01d85",
        projectId: "837c6321-e1f3-4c25-86fe-de028bfe3529", // derrumbar sistema
        creatorId: "94b5c901-57a1-41cf-a81c-45a3b3fcb3dc", // soc l'iris
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "a6751e23-a929-4500-8e32-be0ddb0d4029",
        title: "Recerca sobre els Bibos i els Blets",
        description: "Investigació preliminar per poder plasmar correctament el que són els Bibos i els Blets.",
        defaultPrice: 3,
        startDate: '2024-04-01 23:34:00',
        deadline: '2024-04-10 23:34:00',
        status: 'futur',
        priority: 'alta',
        parentId: "ed98e956-a686-4877-aec9-6c4c43e01d85",
        projectId: "56d3427e-000f-46d6-a8d9-13c4cc2950ef", // BIBOBLETS
        creatorId: "9074884e-c8ab-4632-88de-cc7bf21b2364", // Elena
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "412f79fb-8b35-484c-8ecc-f27ce7d1a12d",
        title: "Esboç inicial tríptics / poster / logo",
        description: "Elaboració del primer esboç de la campanya i reunió de feedback amb client",
        defaultPrice: 3,
        startDate: '2024-04-11 23:34:00',
        deadline: '2024-04-20 23:34:00',
        status: 'futur',
        priority: 'alta',
        parentId: "ed98e956-a686-4877-aec9-6c4c43e01d85",
        projectId: "56d3427e-000f-46d6-a8d9-13c4cc2950ef", // BIBOBLETS
        creatorId: "9074884e-c8ab-4632-88de-cc7bf21b2364", // Elena
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "eb1ac0d9-eafc-448f-8b9a-5a687746666e",
        title: "Millores en el disseny",
        description: "Aplicació de millores en el disseny en base als comentaris del client.",
        defaultPrice: 3,
        startDate: '2024-05-01 23:34:00',
        deadline: '2024-05-10 23:34:00',
        status: 'futur',
        priority: 'alta',
        parentId: "ed98e956-a686-4877-aec9-6c4c43e01d85",
        projectId: "56d3427e-000f-46d6-a8d9-13c4cc2950ef", // BIBOBLETS
        creatorId: "9074884e-c8ab-4632-88de-cc7bf21b2364", // Elena
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "ea380761-ba9e-4067-8169-7735a92c29d2",
        title: "Gestió dels posts a ig primer semestre 2024",
        description: "Gestió dels posts a Instagram durant el primer semestre de 2024.",
        defaultPrice: 3,
        startDate: '2024-01-01 23:34:00',
        deadline: '2024-06-30 23:34:00',
        status: 'futur',
        priority: 'alta',
        parentId: "ed98e956-a686-4877-aec9-6c4c43e01d85",
        projectId: "837c6321-e1f3-4c25-86fe-de028bfe3222", // ex-presos
        creatorId: "46c4f6ca-026a-4581-bcf1-af5b7eeb0dab", // Francina
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('People', null, {});
  }
};

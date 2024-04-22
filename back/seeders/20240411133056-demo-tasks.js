'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Tasks', [
      {
        id: "ed98e956-a686-4877-aec9-6c4c43e01d84", // facturar
        title: "facturar",
        color: "pink",
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
        color: "red",
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
        color: "green",
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
        id: "ed98e956-a686-4877-aec9-6c4c43e01d87", // imprimir
        title: "imprimir disseny",
        color: "blue",
        description: "",
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
        color: "pink",
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
        color: "cyan",
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
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('People', null, {});
  }
};

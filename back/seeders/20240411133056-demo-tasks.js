'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Tasks', [
      {
        id: "08e2e87a-7e31-46e8-9abd-037bc4d931db",
        title: "facturar",
        descripcio: "",
        defaultPrice: 0.5,
        deadline: '2024-08-10 23:34:00',
        status: 'pendent',
        priority: 'alta',
        parentId: null,
        projectId: "XXXXXX",
        workerId: "94b5c901-57a1-41cf-a81c-45a3b3fcb3dc", // soc l'iris
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "08e2e87a-7e31-46e8-9abd-037bc4d931db",
        title: "primer esboss",
        descripcio: "no oblidar integrar Gats",
        defaultPrice: 0.5,
        deadline: '2024-08-10 23:34:00',
        status: 'en curs',
        priority: 'mitja',
        parentId: null,
        projectId: "XXXXXX",
        workerId: "94b5c901-57a1-41cf-a81c-45a3b3fcb3dc", // soc l'iris
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "08e2e87a-7e31-46e8-9abd-037bc4d931db",
        title: "respondre al client",
        descripcio: "ens ha trucat perquè vol noticies",
        defaultPrice: 0.5,
        deadline: '2024-08-10 23:34:00',
        status: 'pendent',
        priority: 'baixa',
        parentId: null,
        projectId: "XXXXXX",
        workerId: "94b5c901-57a1-41cf-a81c-45a3b3fcb3dc", // soc l'iris
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "08e2e87a-7e31-46e8-9abd-037bc4d931db",
        title: "imprimir disseny",
        descripcio: "",
        defaultPrice: 0.5,
        deadline: '2024-08-10 23:34:00',
        status: 'futur',
        priority: 'alta',
        parentId: null,
        projectId: "XXXXXX",
        workerId: "94b5c901-57a1-41cf-a81c-45a3b3fcb3dc", // soc l'iris
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

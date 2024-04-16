'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Notes', [
      {
        id: "08e2e87a-7e31-46e8-9abd-037bc4d931db",
        title: "Note 1",
        text: "note 1, linked to worker",
        commentableType: "worker",
        commentableId: "74114925-269f-4f44-89bd-6d9259847489", // ets la judit 
        creatorId: "94b5c901-57a1-41cf-a81c-45a3b3fcb3dc", // soc l'iris
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "08e2e87a-7e31-46e8-9abd-037bc4d945gg",
        title: "Note 2",
        text: "note 2, linked to project",
        commentableType: "project",
        commentableId: "837c6321-e1f3-4c25-86fe-de028bfe3529", // project linked to iris
        creatorId: "94b5c901-57a1-41cf-a81c-45a3b3fcb3dc", // soc iris
        createdAt: new Date(),
        updatedAt: new Date()
      }, 
      {
        id: "08e2e87a-7e31-46e8-9abd-037bc4d087kk",
        title: "Note 3",
        text: "note 3, linked to project",
        commentableType: "project",
        commentableId: "837c6321-e1f3-4c25-86fe-de028bfe3529", // project linked to iris
        creatorId: "74114925-269f-4f44-89bd-6d9259847489", // ets la judit
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "08e2e87a-7e31-46e8-9abd-037bc4d931pp",
        title: "Note 4",
        text: "note 4, linked to iris",
        commentableType: "worker",
        commentableId: "94b5c901-57a1-41cf-a81c-45a3b3fcb3dc", // soc l'iris 
        creatorId: "94b5c901-57a1-41cf-a81c-45a3b3fcb3dc", // soc l'iris
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "7547cb66-6ea8-44fb-90a6-0b793bec6abb",
        title: "Note 5",
        text: "note 5, linked to juju",
        commentableType: "worker",
        commentableId: "74114925-269f-4f44-89bd-6d9259847489", // ets la Juju
        creatorId: "94b5c901-57a1-41cf-a81c-45a3b3fcb3dc", // soc l'iris
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "094a798c-5087-403e-9632-94f56bf91bf6",
        title: "Note 6",
        text: "si et sort aquesta nota amora, ha funcionat el polimorfi",
        commentableType: "project",
        commentableId: "837c6321-e1f3-4c25-86fe-de028bfe3222", // projecte temps de qualitat, assignat a Juju
        creatorId: "94b5c901-57a1-41cf-a81c-45a3b3fcb3dc", // soc l'iris
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Notes', null, {});
  }
};

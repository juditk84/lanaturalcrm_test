'use strict';

const { v4: uuidv4 } = require('uuid')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.bulkInsert('Projects', [
      {
        id: "837c6321-e1f3-4c25-86fe-de028bfe3149",
        name: "Whack-a-Mole design for Ateneu Candela",
        start_date: "2024-03-01 12:00:00",
        end_date: "2024-04-01 12:00:00",
        description: "l'Ateneu Candela vol un whack-a-mole com el del Sam&Max per promocionar l'esport i la vida saludable.",
        projectTypeId: 1,
        memberId: "03e65ded-5e8e-4796-b770-25bf96f12ae1",
        workerId: "74114925-269f-4f44-89bd-6d9259847489", // la juju
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "837c6321-e1f3-4c25-86fe-de028bfe3529",
        name: "Derrumbar el sistema",
        start_date: "2024-03-01 12:00:00",
        end_date: "2024-04-01 12:00:00",
        description: "portem molts anys, aixó va per llarg",
        projectTypeId: 2,
        memberId: "d9f281b8-d231-464d-a119-62621af6b33f",
        workerId: "94b5c901-57a1-41cf-a81c-45a3b3fcb3dc", // l'iris
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "837c6321-e1f3-4c25-86fe-de028bfe3111",
        name: "Anar a dinar",
        start_date: "2024-03-01 12:00:00",
        end_date: "2024-07-08 12:00:00",
        description: "tinc gana",
        projectTypeId: 3,
        memberId: "58d7c496-f5d6-402e-858e-c50db7eafcf8",
        workerId: "94b5c901-57a1-41cf-a81c-45a3b3fcb3dc", // l'iris
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "837c6321-e1f3-4c25-86fe-de028bfe3222",
        name: "Passar temps de qualitat",
        start_date: "2024-03-01 12:00:00",
        end_date: "2024-07-08 12:00:00",
        description: "un projecte creat per testejar desde the Juju perfil",
        projectTypeId: 2,
        memberId: "58d7c496-f5d6-402e-858e-c50db7eafcf8",
        workerId: "74114925-269f-4f44-89bd-6d9259847489", // la Juju
        createdAt: new Date(),
        updatedAt: new Date()
      } 
    ], {});

  },

  async down (queryInterface, Sequelize) {

     await queryInterface.bulkDelete('Projects', null, {});

  }
};

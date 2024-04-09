'use strict';

const { v4: uuidv4 } = require('uuid')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.bulkInsert('Projects', [
      {
        id: "837c6321-e1f3-4c25-86fe-de028bfe3149",
        name: "creació de CRM",
        start_date: "2024-02-01 12:00:00",
        end_date: "2025-01-31 12:00:00",
        description: "creació d'un CRM per la gestió de la cooperativa La Natural. Subvenció projecte BRUIXIT",
        projectTypeId: 6,
        memberId: "03e65ded-5e8e-4796-b770-25bf96f12ae1",
        workerId: "74114925-269f-4f44-89bd-6d9259847489", // la Juju
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
        workerId: "94b5c901-57a1-41cf-a81c-45a3b3fcb3dc", // la Iris
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "56d3427e-000f-46d6-a8d9-13c4cc2950ef",
        name: "Disseny gràfic campanya BIBOBLETS",
        start_date: "2024-03-01 12:00:00",
        end_date: "2024-07-08 12:00:00",
        description: "Disseny gràfic per la campanya de promoció dels Bibos i els Blets a Terrassa.",
        projectTypeId: 1,
        memberId: "58d7c496-f5d6-402e-858e-c50db7eafcf8",
        workerId: "9074884e-c8ab-4632-88de-cc7bf21b2364", // l'Elena
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "837c6321-e1f3-4c25-86fe-de028bfe3222",
        name: "Gestió XXSS ex-presos franquisme",
        start_date: "2024-03-01 12:00:00",
        end_date: "2024-07-08 12:00:00",
        description: "Gestió de la comunicació i perfils de xarxes socials de l'associació d'ex-presos polítics del franquisme",
        projectTypeId: 3,
        memberId: "147890f6-ef1c-4dad-9cbc-a11306d737bf", // ex-presos
        workerId: "46c4f6ca-026a-4581-bcf1-af5b7eeb0dab", // la Francina
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "400f5c11-64a0-46b5-8e0c-d1d57ebf0022",
        name: "ESTRUCTURA",
        start_date: "2019-01-01 12:00:00",
        end_date: "9999-12-31 12:00:00",
        description: "Projecte per encabir tot alló que té a veure amb la gestió de La Natural, sobretot facturació i subvencions.",
        projectTypeId: 5,
        memberId: "38093f50-3409-4677-904d-8428c0e11ab7", // La Natural
        workerId: "83482ffe-63d1-403c-83d5-a70dd01ae597", // l'Ana Belén'
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "ccd0571e-a431-467b-b770-5652b0426815",
        name: "EXCEL TÓ LOKO",
        start_date: "2019-01-01 12:00:00",
        end_date: "9999-12-31 12:00:00",
        description: "Apanyar l'excel del Departament de Suport a l'Empresa, que està quite mangled.",
        projectTypeId: 5,
        memberId: "e226996f-5d4d-4bf2-9969-739e62e6d12a", // Ajuntament de Terrassa
        workerId: "74114925-269f-4f44-89bd-6d9259847489", // l'Ana Belén'
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});

  },

  async down (queryInterface, Sequelize) {

     await queryInterface.bulkDelete('Projects', null, {});

  }
};

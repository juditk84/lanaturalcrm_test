'use strict';

const { v4: uuidv4 } = require('uuid')


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Members', [
      {
        id: "03e65ded-5e8e-4796-b770-25bf96f12ae1",
        commercialName1: 'Ateneu Candela',
        email: 'candelagestio@gmail.com',
        officialId: "G6346477",
        address: "SANT GAIETA, Nº 73",
        city: "TERRASSA",
        postcode: "08221",
        country: "SPAIN",
        phoneNumber: "937339421",
        memberType: 'entity',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "a0ff9e3d-2bc0-4e95-bdea-e7eb3028f4c1",
        commercialName1: 'Abacus Cooperativa',
        email: 'abacusonline@abacus.coop',
        officialId: "F08226714",
        address: "CARRER PERU, 186",
        city: "BARCELONA",
        postcode: "08020",
        country: "SPAIN",
        phoneNumber: "932178166",
        memberType: 'entity',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "d9f281b8-d231-464d-a119-62621af6b33f",
        commercialName1: 'Casa Ametlla',
        email: 'info@casaametlla.cat',
        officialId: "R44455566",
        address: "POL. IND. ELS CRAPITOS, CARRER TRAMUNTANA 110, ARTÉS",
        city: "ARTÉS",
        postcode: "08777",
        country: "SPAIN",
        phoneNumber: "935556677",
        memberType: 'entity',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "d3c92e9c-b840-43b6-b84e-e7a84f8ea595",
        commercialName1: 'Super Talló SA',
        email: 'abacusonline@abacus.coop',
        officialId: "A08969420",
        address: "PLAZA TRIOMF, 24",
        city: "TERRASSA",
        postcode: "08225",
        country: "SPAIN",
        phoneNumber: "937357722",
        memberType: 'entity',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "a115a827-542f-4417-b8a8-f29c6ea790ef",
        commercialName1: 'Universitat Autònoma de Barcelona',
        email: 'info@uab.cat',
        officialId: "Q0818002H",
        address: "Campus de la UAB",
        city: "BELLATERRA",
        postcode: "08193",
        country: "SPAIN",
        phoneNumber: "937357722",
        memberType: 'entity',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "58d7c496-f5d6-402e-858e-c50db7eafcf8",
        commercialName1: 'ASSOCIACIO SYNUSIA',
        email: 'info@sinusia.cat',
        officialId: "G65738965",
        address: "Carrer Sant Gaietà, 73",
        city: "TERRASSA",
        postcode: "08221",
        country: "SPAIN",
        phoneNumber: "937357722",
        memberType: 'entity',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "e226996f-5d4d-4bf2-9969-739e62e6d12a",
        commercialName1: 'AJUNTAMENT DE TERRASSA',
        email: 'terrassa@terrassa.cat',
        officialId: "Z01234567B",
        address: "Carrer Raval de Montserrat, 30",
        city: "TERRASSA",
        postcode: "08221",
        country: "SPAIN",
        phoneNumber: "93700700",
        memberType: 'entity',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "147890f6-ef1c-4dad-9cbc-a11306d737bf",
        commercialName1: 'Associació d\'Ex-Presos del Franquisme',
        email: 'expresos@franquisme.cat',
        officialId: "Z0000001B",
        address: "Carrer Franco Ha Muerto, 76",
        city: "TERRASSA",
        postcode: "08221",
        country: "SPAIN",
        phoneNumber: "93100100",
        memberType: 'entity',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "38093f50-3409-4677-904d-8428c0e11ab7",
        commercialName1: 'La Natural Coopmunicació',
        email: 'lanatural@coop.cat',
        officialId: "Z9998887B",
        address: "Carrer de la Coopmunicació, 500", // és un carrer llarg apparently xD
        city: "TERRASSA",
        postcode: "08221",
        country: "SPAIN",
        phoneNumber: "93333444",
        memberType: 'entity',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Members', null, {});
  }
};

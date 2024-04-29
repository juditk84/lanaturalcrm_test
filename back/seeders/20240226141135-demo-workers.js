'use strict';

const { v4: uuidv4 } = require('uuid')


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Workers', [
      {
        id: "74114925-269f-4f44-89bd-6d9259847489",
        firstname: "Judit",
        lastname2: "Timoneda",
        lastname1: "Calero",
        pronouns: "she/her",
        role: "IT developer",
        officialId: "46772100J",
        email: "judit.calero84@gmail.com",
        username: "Judit",
        password: "$2b$10$IF2j7SrHWntEfa7fOs4IQ.EHrp1f5YHsbEB39tluHuBn22WylfzkO",
        color: "red",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { 
        id: "94b5c901-57a1-41cf-a81c-45a3b3fcb3dc",
        firstname: "Iris",
        lastname2: "Natassie Georges Lulu",
        lastname1: "Huard",
        pronouns: "she/her",
        role: "IT developer",
        officialId: "46772100J",
        email: "someirismail@gmail.com",
        username: "Iris",
        password: "$2b$10$qMB7jIbA.9jGKquBC5Ki7O25Pnmf2ePfPsu2BpKWlxN6nXxxkPcne",
        color: "green",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { 
        id: "9074884e-c8ab-4632-88de-cc7bf21b2364",
        firstname: "Elena",
        lastname2: "",
        lastname1: "Ortega",
        pronouns: "she/her",
        role: "Dissenyadora Gràfica / Il·lustradora",
        officialId: "00066600X",
        email: "someelenamail@gmail.com",
        username: "Elena",
        password: "$2b$10$rRxQS8ERFR09bzLF.wRh6uWd0NWCYLFIKQm.vO71d59bR0xmXCfYO",
        color: "pink",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { 
        id: "83482ffe-63d1-403c-83d5-a70dd01ae597",
        firstname: "Ana Belén",
        lastname2: "Apellidísimo",
        lastname1: "Apellido",
        pronouns: "she/her",
        role: "Gestió i comunicació",
        officialId: "00044400X",
        email: "someanabelenmail@gmail.com",
        username: "Ana Belén",
        password: "$2b$10$Az2M0jJ.DxcEs/rOxIDKIuH2Q.hcMxgYAwbQwf0bZx7H5lH7EgVZy",
        color: "cyan",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { 
        id: "40c86a5e-11af-4a35-b313-1f8b0d4e71a2",
        firstname: "Laura",
        lastname2: "Apellidísimo",
        lastname1: "Soriano",
        pronouns: "she/her",
        role: "Disseny Web i Disseny Gràfic",
        officialId: "00077700X",
        email: "someanabelenmail@gmail.com",
        username: "Laura",
        password: "$2b$10$BXyz7HGGFJUgU3m/eZSwpeJtOqu1T76SXtSVkGkSRT8DAyOr4s1.W",
        color: "pink",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { 
        id: "137ae8d7-9c8e-40ec-a590-0f912e658d20",
        firstname: "Irene",
        lastname2: "Apellidísimo",
        lastname1: "Parra",
        pronouns: "she/her",
        role: "Gestió",
        officialId: "00033300X",
        email: "someanabelenmail@gmail.com",
        username: "Irene",
        password: "$2b$10$kcF5xhP9Ip4Nii6x2/J0Bulylfg.dCWTXIUidc5ynwXUZFj/QZQG6",
        color: "blue",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { 
        id: "46c4f6ca-026a-4581-bcf1-af5b7eeb0dab",
        firstname: "Francina",
        lastname2: "Apellidísimo",
        lastname1: "Gorina",
        pronouns: "she/her",
        role: "Xarxes Socials",
        officialId: "00099900X",
        email: "somefrancinamail@gmail.com",
        username: "Francina",
        password: "$2b$10$1OXD/Ann5blvJQ7ohV6jdu9CYsgtYJR1oIhq8f1uopydE03Wb2gTO",
        color: "magenta",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Transactions', null, {});
  }
};

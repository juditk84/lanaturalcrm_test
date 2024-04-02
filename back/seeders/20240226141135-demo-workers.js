'use strict';

const { v4: uuidv4 } = require('uuid')


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   

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
        createdAt: new Date(),
        updatedAt: new Date()
      }])
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Transactions', null, {});
  }
};

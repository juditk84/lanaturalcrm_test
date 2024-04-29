'use strict';
/** @type {import('sequelize-cli').Migration} */


module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Workers', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      firstname: {
        type: Sequelize.STRING
      },
      lastname2: {
        type: Sequelize.STRING
      },
      lastname1: {
        type: Sequelize.STRING
      },
      // fullName: {
      //   type: Sequelize.VIRTUAL,
      //   get() {
      //     return `${this.firstNname} ${this.lastname1} ${this.lastname2}`;
      //   },
      //   set(value) {
      //     throw new Error('Do not try to set the `fullName` value!');
      //   },
      // },
      pronouns: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.STRING
      },
      officialId: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        validate: {
          isEmail: true,
          msg: "dona'm una direcció de mail correcta, si us plau"
        }
      },
      username: {
        type: Sequelize.STRING,
        unique: true,
        validate: {
          len: [5, 18],
          msg: "nom d'usuaria ha de ser únic i comprés entre 5 i 18 cáracters. Proba un altre cop"
        }
      },
      password: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Workers');
  }
};
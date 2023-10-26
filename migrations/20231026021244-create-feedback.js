'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Feedbacks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      DesignerEmail: {
        type: Sequelize.STRING
      },
      CustomerEmail: {
        type: Sequelize.STRING
      },
      DesignerFiles: {
        type: Sequelize.STRING
      },
      CustomerFiles: {
        type: Sequelize.STRING
      },
      DesignerText: {
        type: Sequelize.STRING
      },
      CustomerText: {
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
    await queryInterface.dropTable('Feedbacks');
  }
};
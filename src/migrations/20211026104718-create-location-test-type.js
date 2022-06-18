'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('LocationTestTypes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      test_type_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      location_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      location_test_type_ref: {
        type: Sequelize.STRING,
        allowNull: true
      },
      description :{
        type: Sequelize.TEXT,
        allowNull: true
      },
      price: {
        type: Sequelize.DOUBLE,
        allowNull: true
      },
      is_paid_type: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      is_insurance_test:{
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      acuity_ref :{
        type: Sequelize.STRING,
        allowNull: true
      },
      qr_code: {
        type: Sequelize.STRING,
        allowNull: true
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('LocationTestTypes');
  }
};
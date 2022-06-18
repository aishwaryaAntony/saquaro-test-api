'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    try {
      await queryInterface.addColumn('LocationTestTypes', 'rank_order', {
        type: Sequelize.INTEGER,
        allowNull: true
      }); 
      await queryInterface.addColumn('LocationTestTypes', 'display_name', {
        type: Sequelize.STRING,
        allowNull: true
      });     
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  },

  down: async (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
   try {      
      await queryInterface.removeColumn('LocationTestTypes', 'rank_order');
      await queryInterface.removeColumn('LocationTestTypes', 'display_name');
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  }
};

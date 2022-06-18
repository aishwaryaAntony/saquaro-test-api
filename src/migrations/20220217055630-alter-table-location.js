'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		/**
		 * Add altering commands here.
		 *
		 * Example:
		 * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
		 */
		try {
			await queryInterface.addColumn('TestTypes', 'display_name', {
				type: Sequelize.STRING,
				allowNull: true
			});
			return Promise.resolve();
		} catch (e) {
			return Promise.reject(e);
		}
	},

	down: async (queryInterface, Sequelize) => {
		/**
		 * Add reverting commands here.
		 *
		 * Example:
		 * await queryInterface.dropTable('users');
		 */
		try {
			await queryInterface.removeColumn('TestTypes', 'display_name');
			return Promise.resolve();
		} catch (e) {
			return Promise.reject(e);
		}
	}
};

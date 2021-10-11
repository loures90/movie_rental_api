'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tbUsers', { 
      id: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      name: Sequelize.STRING,
      login: Sequelize.STRING,
      email: Sequelize.STRING,
      password: Sequelize.STRING,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('tbUsers');

  }
};

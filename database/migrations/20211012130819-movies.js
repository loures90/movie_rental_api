'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tbMovies', { 
      id: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      title: Sequelize.STRING,
      year_release: Sequelize.STRING,
      gender: Sequelize.STRING,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('tbMovies');
  }
};

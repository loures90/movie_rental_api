'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('tbMovies', 'gender')
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('tbMovies')
  }
};

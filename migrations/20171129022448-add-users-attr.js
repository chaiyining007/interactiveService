'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    const { CHAR } = Sequelize;
    queryInterface.addColumn('users', 'name', { type: CHAR(255), allowNull: false, defaultValue: '不明人士' })
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn('users', 'name');
  }
};

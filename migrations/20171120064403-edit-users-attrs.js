'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    const { INTEGER, CHAR, TEXT, BIGINT } = Sequelize;
    queryInterface.changeColumn('users', 'mobile', {
      type: CHAR(255),
      allowNull: true
    });
    queryInterface.changeColumn('users', 'email', {
      type: CHAR(255),
      allowNull: true
    });
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.changeColumn('users', 'mobile', {
      type: CHAR(255),
      allowNull: false
    });
    queryInterface.changeColumn('users', 'email', {
      type: CHAR(255),
      allowNull: false
    });
  }
};

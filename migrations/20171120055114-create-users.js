'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    const { INTEGER, CHAR, TEXT, BIGINT } = Sequelize;
    queryInterface.createTable('users', {
      id: { type: INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },
      mobile: { type: CHAR(255), allowNull: false, defaultValue: '' },
      email: { type: CHAR(255), allowNull: false, defaultValue: '' },
      avatar: { type: CHAR(255), allowNull: false, defaultValue: '' },
      encrypted_password: { type: CHAR(255), allowNull: false },
      login: { type: CHAR(255), allowNull: false },
      authenticate_token: { type: CHAR(255), allowNull: false },
      created_at: { type: BIGINT, allowNull: false },
      updated_at: { type: BIGINT, allowNull: false },
    });
    queryInterface.addIndex('users', {
      fields: ['login'],
      unique: true
    })
    queryInterface.addIndex('users', {
      fields: ['authenticate_token'],
      unique: true
    })
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeIndex('users', 'login');
    queryInterface.removeIndex('users', 'authenticate_token');
    queryInterface.dropTable('users');
  }
};

'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    const { INTEGER, CHAR, TEXT, BIGINT } = Sequelize;
    queryInterface.createTable('tasks', {
      id: { type: INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },
      title: { type: CHAR(255), allowNull: false, },
      details: { type: TEXT, allowNull: false, },
      imgs: { type: TEXT, allowNull: false, },
      fid: { type: CHAR(255), allowNull: false, },
      created_at: { type: BIGINT, allowNull: false, },
      updated_at: { type: BIGINT, allowNull: false, },
    });
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.dropTable('tasks');
  }
};

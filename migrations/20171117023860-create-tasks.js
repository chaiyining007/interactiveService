'use strict';

module.exports = {
  up: function (db, Sequelize) {
    const { INTEGER, CHAR, TEXT } = Sequelize;
    db.createTable('tasks', {
      id: { type: INTEGER, primaryKey: true, allowNull: false, },
      title: { type: CHAR(255), allowNull: false, },
      details: { type: TEXT, allowNull: false, },
      imgs: { type: TEXT, allowNull: false, },
      created_at: { type: INTEGER, allowNull: false, },
      updated_at: { type: INTEGER, allowNull: false, },
    });
  },

  down: function (queryInterface, Sequelize) {
    db.dropTable('tasks');
  }
};

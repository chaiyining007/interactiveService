'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    const { INTEGER, CHAR, TEXT, BIGINT } = Sequelize;
    queryInterface.createTable('tasks', {
      id: { type: INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },
      title: { type: CHAR(255), allowNull: false,defaultValue: '', },
      details: { type: TEXT, allowNull: false, },
      imgs: { type: TEXT, allowNull: false, },
      family_id: { type: CHAR(255), allowNull: false, },
      create_user: { type: CHAR(255), allowNull: false, },
      created_at: { type: BIGINT, allowNull: false, },
      updated_at: { type: BIGINT, allowNull: false, },
    });
    queryInterface.addIndex('tasks', {
      fields: ['family_id']
    });
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeIndex('tasks', ['family_id']);
    queryInterface.dropTable('tasks');
  }
};

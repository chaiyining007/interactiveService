'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    const { INTEGER, CHAR, TEXT, BIGINT,ENUM } = Sequelize;
    queryInterface.createTable('tasks', {
      id: { type: INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },
      title: { type: CHAR(255), allowNull: false, defaultValue: '', },
      details: { type: TEXT, allowNull: false, },
      imgs: { type: TEXT, allowNull: false, },
      status: { type: ENUM('not_started','processing','carry_out','undone'), allowNull: false,defaultValue:'not_started' },
      end_status: { type: ENUM('not_finished','end','delete','expired'), allowNull: false,defaultValue:'not_finished' },
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

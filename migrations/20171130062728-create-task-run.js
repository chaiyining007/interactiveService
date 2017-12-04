'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    const { INTEGER, CHAR, TEXT, BIGINT, ENUM } = Sequelize;
    queryInterface.createTable('task_runs', {
      id: { type: INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },
      task_id: { type: INTEGER, allowNull: false, },
      user_id: { type: INTEGER, allowNull: false, },
      created_at: { type: BIGINT, allowNull: false, },
      updated_at: { type: BIGINT, allowNull: false, },
    });
    queryInterface.addIndex('task_runs', {
      fields: ['task_id', 'user_id']
    });
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeIndex('task_runs', ['task_id', 'user_id']);
    queryInterface.dropTable('task_runs');
  }
};

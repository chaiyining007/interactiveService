'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    const { INTEGER, CHAR, TEXT, BIGINT } = Sequelize;
    queryInterface.createTable('families', {
      id: { type: INTEGER, primaryKey: true, allowNull: false, autoIncrement: 10000 },
      name: { type: CHAR(255), allowNull: false, defaultValue: '', },
      avatar: { type: CHAR(255), allowNull: false, defaultValue: '' },
      invitation_code: { type: CHAR(255), allowNull: false, defaultValue: '' },
      created_at: { type: BIGINT, allowNull: false },
      updated_at: { type: BIGINT, allowNull: false },
    });
    queryInterface.addIndex('families', {
      fields: ['invitation_code'],
      unique: true
    });
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeIndex('families', ['invitation_code']);
    queryInterface.dropTable('families');
  }
};

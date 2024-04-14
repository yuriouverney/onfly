'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Permissao', [{
      type: 'expense',
      action: 'read',
      name: 'read:allexpenses',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      type: 'expense',
      action: 'read',
      name: 'read:allbyuser',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      type: 'expense',
      action: 'read',
      name: 'read:expensebyid',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      type: 'expense',
      action: 'read',
      name: 'read:anyexpensebyid',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      type: 'expense',
      action: 'create',
      name: 'create:expense',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      type: 'expense',
      action: 'update',
      name: 'update:expense',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      type: 'expense',
      action: 'update',
      name: 'update:anyexpense',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      type: 'expense',
      action: 'delete',
      name: 'delete:expense',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      type: 'expense',
      action: 'delete',
      name: 'delete:anyexpense',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Permissao', null, {});
  }
};

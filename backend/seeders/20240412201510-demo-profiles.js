'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Profile', [{
      description: 'Admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      description: 'User',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Profile', null, {});
  }
};

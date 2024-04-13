'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('User', [{
      name: 'John Doe',
      user: 'johndoe',
      password: await bcrypt.hash('123', 12),
      email: 'john.doe@example.com',
      active: 1,
      profileId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Jane Doe',
      user: 'janedoe',
      password: await bcrypt.hash('123', 12),
      email: 'jane.doe@example.com',
      active: 1,
      profileId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('User', null, {});
  }
};

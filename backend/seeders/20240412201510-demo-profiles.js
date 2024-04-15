'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'Profile',
      [
        {
          description: 'Admin',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          description: 'User',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Profile', null, {});
  },
};

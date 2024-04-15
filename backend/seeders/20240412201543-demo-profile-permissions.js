'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'ProfilePermission',
      [
        {
          profileId: 1,
          permissionId: 1,
        },
        {
          profileId: 1,
          permissionId: 2,
        },
        {
          profileId: 1,
          permissionId: 3,
        },
        {
          profileId: 1,
          permissionId: 4,
        },
        {
          profileId: 1,
          permissionId: 5,
        },
        {
          profileId: 1,
          permissionId: 6,
        },
        {
          profileId: 1,
          permissionId: 7,
        },
        {
          profileId: 1,
          permissionId: 8,
        },
        {
          profileId: 1,
          permissionId: 9,
        },
        {
          profileId: 2,
          permissionId: 2,
        },
        {
          profileId: 2,
          permissionId: 3,
        },
        {
          profileId: 2,
          permissionId: 5,
        },
        {
          profileId: 2,
          permissionId: 6,
        },
        {
          profileId: 2,
          permissionId: 8,
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('ProfilePermission', null, {});
  },
};

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ProfilePermission', [{
      profileId: 1,
      permissionId: 1
    }, {
      profileId: 1,
      permissionId: 2
    }, {
      profileId: 1,
      permissionId: 3
    }, {
      profileId: 1,
      permissionId: 4
    }, {
      profileId: 1,
      permissionId: 5
    }, {
      profileId: 1,
      permissionId: 6
    }, {
      profileId: 2,
      permissionId: 2
    }, {
      profileId: 2,
      permissionId: 4
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ProfilePermission', null, {});
  }
};

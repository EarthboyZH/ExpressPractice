'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Settings',[{
      name: 'ziyi-api-setting',
      copyright: 'Copyright © 2024 Ziyi. All rights reserved.',
      createdAt: new Date(),
      updatedAt: new Date
    }], {});


  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

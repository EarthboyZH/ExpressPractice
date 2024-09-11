'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', [
      { name: 'Front-end', rank: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Back-end', rank: 2, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Mobile', rank: 3, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Database', rank: 4, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Sever', rank: 5, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Public', rank: 6, createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },
  
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  }
  
};

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        fullname: 'admin',
        email: 'admin@admin.com',
        password: '$2a$10$hqGBlqkAD3Ss7znJQfNuGOGgkOIsRglo82K6tbhyLly/hT..hCxEe',
        role: 'admin',
        createdAt: 0,
        updatedAt: 0,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};

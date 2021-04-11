'use strict';
const bcrypt = require('bcrypt')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {truncate: true,
      cascade: true, restartIdentity: true
    });
    const bulkUsers = await queryInterface.bulkInsert('users', [
    {
      first_name: "User1",
      username: "User1",
      email: "user1@user.com",
      password: bcrypt.hashSync("password123", 12),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      first_name: "User2",
      username: "User2",
      email: "user2@user.com",
      password: bcrypt.hashSync("password123", 12),
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ], {returning: true});
    console.log("users: ", bulkUsers)

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

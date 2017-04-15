'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
      return queryInterface.bulkInsert('Users', [
        {
          name: 'Husni Habil',
          email: 'habilhusni@gmail.com',
          is_Admin: true,
          password: 12345,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], {});
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Users', [
      {
        name: 'Husni Habil',
        email: 'habilhusni@gmail.com',
        is_Admin: true,
        password: 12345,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  }
};

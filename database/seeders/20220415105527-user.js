'use strict';

var {
  randEmail,
  randBoolean,
  randFullName,
  randBetweenDate,
} = require('@ngneat/falso');

module.exports = {
  async up(queryInterface, Sequelize) {
    var users = [
      {
        name: 'John Doe',
        email: 'j@e.com',
        password: '123456',
        isAdmin: true,
        isActive: true,
        joinedAt: new Date(),
        updatedAt: new Date(),
        createdAt: new Date(),
      },
    ];

    for (var i = 0; i < 20; i++) {
      users.push({
        name: randFullName(),
        email: randEmail(),
        password: '123456',
        isAdmin: randBoolean(),
        isActive: randBoolean(),
        joinedAt: randBetweenDate({
          from: new Date('10/07/2020'),
          to: new Date(),
        }),
        updatedAt: randBetweenDate({
          from: new Date('10/07/2020'),
          to: new Date(),
        }),
        createdAt: randBetweenDate({
          from: new Date('10/07/2020'),
          to: new Date(),
        }),
      });
    }
    await queryInterface.bulkInsert('users', users);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  },
};

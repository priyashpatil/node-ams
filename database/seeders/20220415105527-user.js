var {
  randEmail,
  randFullName,
  randBetweenDate,
} = require('@ngneat/falso');

module.exports = {
  async up({context: queryInterface}) {
    var users = [
      {
        name: 'John Doe',
        email: 'john@email.com',
        password: '$2b$10$essKODPYaTn/Sc6qx2aBkucV1Fc59gOnFqXyqZZcvb5S8AF252rLC', // 123456
        isAdmin: true,
        joinedAt: new Date(),
        updatedAt: new Date(),
        createdAt: new Date(),
      },
      {
        name: 'Jane Doe',
        email: 'jane@email.com',
        password: '$2b$10$essKODPYaTn/Sc6qx2aBkucV1Fc59gOnFqXyqZZcvb5S8AF252rLC', // 123456
        isAdmin: false,
        joinedAt: new Date(),
        updatedAt: new Date(),
        createdAt: new Date(),
      },
    ];

    for (var i = 0; i < 20; i++) {
      users.push({
        name: randFullName(),
        email: randEmail(),
        password: '$2b$10$essKODPYaTn/Sc6qx2aBkucV1Fc59gOnFqXyqZZcvb5S8AF252rLC', // 123456
        isAdmin: false,
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

  async down({context: queryInterface}) {
    await queryInterface.bulkDelete('users', {}, {});
  },
};

var { randBetweenDate } = require('@ngneat/falso');

module.exports = {
  async up({ context: queryInterface }) {
    var attendances = [];

    for (var i = 1; i < 21; i++) {
      for (var j = 0; j < 10; j++) {
        attendances.push({
          userId: i,
          punchedAt: randBetweenDate({
            from: new Date('01/04/2022'),
            to: new Date(),
          }),
        });
      }
    }

    await queryInterface.bulkInsert('attendances', attendances);
  },

  async down({ context: queryInterface }) {
    await queryInterface.bulkDelete('attendances', {}, {});
  },
};

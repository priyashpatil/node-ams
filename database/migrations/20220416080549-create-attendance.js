var { Sequelize } = require('sequelize');

module.exports = {
  async up({ context: queryInterface }) {
    await queryInterface.createTable('attendances', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      punchedAt: {
        allowNull: false,
        default: new Date(),
        type: Sequelize.DATEONLY,
      },
    });

    await queryInterface.addConstraint('attendances', {
      fields: ['userId'],
      type: 'foreign key',
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },
  async down({ context: queryInterface }) {
    await queryInterface.dropTable('attendances');
  },
};

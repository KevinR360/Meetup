module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('meetup', 'provider_id', {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      }),
      queryInterface.addColumn('meetup', 'guest_id', {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: true,
      }),
    ]);
  },

  down: queryInterface => {
    return Promise.all([
      queryInterface.removeColumn('meetup', 'provider_id'),
      queryInterface.removeColumn('meetup', 'guest_id'),
    ]);
  },
};

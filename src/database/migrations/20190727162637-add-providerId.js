module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('meetups', 'provider_id', {
      type: Sequelize.INTEGER,
      references: { model: 'users', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('meetups', 'provider_id');
  },
};

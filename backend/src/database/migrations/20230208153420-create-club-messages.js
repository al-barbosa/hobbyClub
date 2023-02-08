'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('club_messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      text: {
        allowNull: false,
        type: Sequelize.STRING(5000),
      },
      club_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onUpate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'club_id',
        references: {
          model: 'hobbies',
          key: 'id',
        },
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onUpate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'user_id',
        references: {
          model: 'users',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'created_at',
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'updated_at',
      },
    });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('club_messages');
  },
};

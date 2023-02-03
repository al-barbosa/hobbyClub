'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_messages', {
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
      sender_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onUpate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'sender_id',
        references: {
          model: 'users',
          key: 'id',
        },
      },
      receiver_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onUpate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'receiver_id',
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
      read: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
    });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('user_messages');
  },
};

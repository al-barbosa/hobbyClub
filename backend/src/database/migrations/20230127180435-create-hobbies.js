/* eslint-disable max-lines-per-function */
// 'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('hobbies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      type: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      img: {
        allowNull: true,
        type: Sequelize.STRING(512),
      },
      finished: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      clubId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onUpate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'club_id',
        references: {
          model: 'clubs',
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
    await queryInterface.dropTable('hobbies');
  },
};

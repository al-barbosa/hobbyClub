'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('user_messages', [
      {
        text: 'Bom dia, está é uma mensagem de teste ainda não lida',
        sender_id: 2,
        receiver_id: 1,
        read: false,
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      {
        text: 'Bom dia, está é uma mensagem de teste já lida',
        sender_id: 3,
        receiver_id: 1,
        read: true,
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('user_messages', null, {});
  },
};

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('club_messages', [
      {
        text: 'Precisamos escolher um novo hobby!',
        club_id: 2,
        user_id: 2,
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      {
        text: 'Sim, e eu sugiro uma HQ.',
        club_id: 2,
        user_id: 1,
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('club_messages', null, {});
  },
};

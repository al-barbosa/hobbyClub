/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-lines-per-function */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('hobbies', [
      {
        name: 'O Capital',
        type: 'book',
        img: 'https://covers.openlibrary.org/b/isbn/8575595482-L.jpg',
        finished: false,
        club_id: 1,
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      {
        name: 'Manifesto do Partido Comunista',
        type: 'book',
        img: 'https://covers.openlibrary.org/b/isbn/8563560360-L.jpg',
        finished: true,
        club_id: 1,
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      {
        name: 'Povo Brasileiro',
        type: 'book',
        img: null,
        finished: false,
        club_id: 2,
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      {
        name: 'Minority Report',
        type: 'movie',
        img: 'https://image.tmdb.org/t/p/w500/ccqpHq5tk5W4ymbSbuoy4uYOxFI.jpg',
        finished: true,
        club_id: 2,
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      {
        name: 'Fatal Frame 2',
        type: 'game',
        finished: false,
        club_id: 3,
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      {
        name: 'Resident Evil Zero',
        type: 'game',
        finished: true,
        club_id: 3,
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      {
        name: 'Dead Space',
        type: 'game',
        finished: true,
        club_id: 3,
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      {
        name: 'O Iluminado',
        type: 'book',
        img: 'https://covers.openlibrary.org/b/isbn/8581050484-L.jpg',
        finished: true,
        club_id: 3,
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('hobbies', null, {});
  },
};

/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-lines-per-function */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('hobbies', [
      {
        name: 'O Senhor dos Anéis: A Sociedade do Anel',
        type: 'book',
        img: 'https://ia601401.us.archive.org/view_archive.php?archive=/32/items/l_covers_0008/l_covers_0008_17.tar&file=0008174367-L.jpg',
        finished: false,
        club_id: 1,
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      {
        name: 'O Hobbit',
        type: 'book',
        img: 'https://covers.openlibrary.org/b/isbn/8595084742-L.jpg',
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
        img: 'https://howlongtobeat.com/games/250px-Fatal_Frame_II_-_Crimson_Butterfly.jpg?width=250',
        finished: false,
        club_id: 3,
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      {
        name: 'Resident Evil Zero',
        type: 'game',
        img: 'https://howlongtobeat.com/games/250px-Rezerobox.jpg?width=250',
        finished: true,
        club_id: 3,
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      {
        name: 'Dead Space',
        type: 'game',
        img: 'https://howlongtobeat.com/games/Dead_Space_Box_Art.jpg?width=250',
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

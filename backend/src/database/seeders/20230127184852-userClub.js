/* eslint-disable max-lines-per-function */
/* eslint-disable @typescript-eslint/naming-convention */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users_clubs', [
      {
        user_id: 1,
        club_id: 1,
      },
      {
        user_id: 1,
        club_id: 2,
      },
      {
        user_id: 2,
        club_id: 2,
      },
      {
        user_id: 2,
        club_id: 3,
      },
      {
        user_id: 3,
        club_id: 1,
      },
      {
        user_id: 3,
        club_id: 2,
      },
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users_clubs', null, {});
  },
};

/* eslint-disable @typescript-eslint/naming-convention */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('clubs', [
      {
        name: 'Clube do Professor Tolkien',
        admin_id: 1,
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      {
        name: 'Clube de Leitura da Pandemia',
        admin_id: 3,
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      {
        name: 'Clube da Meia Noite',
        admin_id: 2,
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('clubs', null, {});
  },
};

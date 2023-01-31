module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
        username: 'Alberto',
        email: 'alberto@email.com',
        password: '$2a$10$vkDLwxbki4Xv7QoJV1cZOuuh0/ldl1VhXAum.vh6ETvXX0DxV9yc.',
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      {
        username: 'Luiz',
        email: 'Luiz@email.com',
        password: '$2a$10$vkDLwxbki4Xv7QoJV1cZOuuh0/ldl1VhXAum.vh6ETvXX0DxV9yc.',
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      {
        username: 'Rafael',
        email: 'rafael@email.com',
        password: '$2a$10$vkDLwxbki4Xv7QoJV1cZOuuh0/ldl1VhXAum.vh6ETvXX0DxV9yc.',
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};

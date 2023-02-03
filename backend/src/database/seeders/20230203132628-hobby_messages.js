'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('hobby_messages', [
      {
        text: 'Assisti "Minority Report" pela primeira vez quando ainda era febre em 2002, confesso que não havia gostado, reassisti alguns meses atrás e mudei completamente de opinião.',
        hobby_id: 4,
        user_id: 1,
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      {
        text: 'Um filme mistura ficção cientifica e suspense com ação, com o desenvolvimento da história muito bem feita, Spielberg nem precisa comentar a sua impecável direção',
        hobby_id: 4,
        user_id: 2,
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      {
        text: 'Um filme eletrizante do início ao fim, muito bem elaborado. Apesar de Tom Cruise está bem, quem para mim rouba a cena é Colin Pharrel em seu primeiro grande papel de destaque no cinema.',
        hobby_id: 4,
        user_id: 3,
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      {
        text: 'Um filme com a cara de Steven Spielberg.',
        hobby_id: 4,
        user_id: 1,
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      {
        text: 'Leitura importante para se ter uma visão ampliada sobre o tema e então compreender melhor a real e atual situação experimentada por nossa sociedade. Desenvolvimento e concatenação didática e intuitiva quanto à elaboração e apresentação textual. Entendo ser uma leitura importante para ampliar o conhecimento, desenvolver o pensamento crítico e se quebrar paradigmas, que por várias vezes, infelizmente, apenas são expressados e defendidos por muitos que, sem qualquer conhecimento e propriedade, tentam "impor" como "conhecimento de causa" ou, pior, "argumento de autoridade", o que se torna muito perigoso, ainda mais nos dias atuais, onde o pensamento racional e crítico parece cada vez mais se distanciar das pessoas onde, na verdade, deveria ser o oposto.',
        hobby_id: 3,
        user_id: 1,
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      {
        text: 'Gostei muito e recomendo a todos este clássico que trata da antropologia histórica de nossa nação. Muito interessante conhecer os povos que compõem nossa cultura! Achei as conexões para o Brasil que tinha de modo difuso em mente e muito mais. Leia!!! Obrigado Prof. Darcy.',
        hobby_id: 3,
        user_id: 2,
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      {
        text: 'Neste último livro de sua obra, Darcy faz uma síntese da formação das gentes do Brasil. Não é uma obra que se orienta pelo tempo histórico, mas começa com a colonização e vai até o começo do século XX. No final do livro há um rápido comentário sobre o “destino nacional”, mas não se encontra a análise das implicações do século XX para a configuração da gente brasileira.',
        hobby_id: 3,
        user_id: 3,
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('hobby_messages', null, {});
  },
};

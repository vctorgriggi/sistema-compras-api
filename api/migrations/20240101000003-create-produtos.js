"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Produtos", {
      id: {
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      nome: {
        type: Sequelize.STRING,
      },
      imagemUrl: {
        type: Sequelize.TEXT,
      },
      descricao: {
        type: Sequelize.TEXT,
      },
      categoriaDeProdutoId: {
        type: Sequelize.UUID,
        references: {
          model: "CategoriasDeProdutos",
          key: "id",
        },
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Produtos");
  },
};

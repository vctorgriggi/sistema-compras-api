"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Cotacoes", {
      id: {
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      validade: {
        type: Sequelize.DATE,
      },
      quantidade: {
        type: Sequelize.INTEGER,
      },
      valor: {
        type: Sequelize.DECIMAL(10, 2),
      },
      observacao: {
        type: Sequelize.TEXT,
      },
      fornecedorId: {
        type: Sequelize.UUID,
        references: {
          model: "Fornecedores",
          key: "id",
        },
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
      },
      produtoId: {
        type: Sequelize.UUID,
        references: {
          model: "Produtos",
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
    await queryInterface.dropTable("Cotacoes");
  },
};

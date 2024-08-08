"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Produtos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Produtos.belongsTo(models.CategoriasDeProdutos, {
        as: "categoriaDeProduto",
        foreignKey: "categoriaDeProdutoId",
      });
      Produtos.hasMany(models.Cotacoes, {
        as: "cotacoes",
        foreignKey: "produtoId",
      });
      Produtos.belongsToMany(models.Fornecedores, {
        through: models.FornecedoresProdutos,
        as: "fornecedores",
        foreignKey: "produtoId",
      });
    }
  }
  Produtos.init(
    {
      nome: DataTypes.STRING,
      imagemUrl: DataTypes.TEXT,
      descricao: DataTypes.TEXT,
      categoriaDeProdutoId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "Produtos",
    }
  );
  return Produtos;
};

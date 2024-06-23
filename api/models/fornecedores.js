"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Fornecedores extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Fornecedores.hasMany(models.Contatos, {
        as: "contatos",
        foreignKey: "fornecedorId",
      });
      Fornecedores.hasMany(models.Cotacoes, {
        as: "cotacoes",
        foreignKey: "fornecedorId",
      });
      Fornecedores.belongsToMany(models.Produtos, {
        through: models.FornecedoresProdutos,
        as: "produtos",
        foreignKey: "fornecedorId",
      });
    }
  }
  Fornecedores.init(
    {
      nome: DataTypes.STRING,
      endereco: DataTypes.TEXT,
      telefone: DataTypes.STRING,
      email: DataTypes.STRING,
      cnpj: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Fornecedores",
    }
  );
  return Fornecedores;
};

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cotacoes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Cotacoes.belongsTo(models.Fornecedores, {
        as: "fornecedor",
        foreignKey: "fornecedorId",
      });
      Cotacoes.belongsTo(models.Produtos, {
        as: "produto",
        foreignKey: "produtoId",
      });
    }
  }
  Cotacoes.init(
    {
      validade: DataTypes.DATE,
      quantidade: DataTypes.INTEGER,
      valor: DataTypes.DECIMAL(10, 2),
      observacao: DataTypes.TEXT,
      fornecedorId: DataTypes.UUID,
      produtoId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "Cotacoes",
    }
  );
  return Cotacoes;
};

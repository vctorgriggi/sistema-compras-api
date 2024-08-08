"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Contatos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Contatos.belongsTo(models.Fornecedores, {
        as: "fornecedor",
        foreignKey: "fornecedorId",
      });
    }
  }
  Contatos.init(
    {
      nome: DataTypes.STRING,
      telefone: DataTypes.STRING,
      email: DataTypes.STRING,
      cargo: DataTypes.STRING,
      fornecedorId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "Contatos",
    }
  );
  return Contatos;
};

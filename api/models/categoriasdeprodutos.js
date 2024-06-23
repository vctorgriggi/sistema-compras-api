"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CategoriasDeProdutos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CategoriasDeProdutos.hasMany(models.Produtos, {
        as: "produtos",
        foreignKey: "categoriaDeProdutoId",
      });
    }
  }
  CategoriasDeProdutos.init(
    {
      nome: DataTypes.STRING,
      imagemUrl: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "CategoriasDeProdutos",
    }
  );
  return CategoriasDeProdutos;
};

const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");

const database = require("../models");

class ProdutoService {
  async create(dto) {
    if (dto.categoriaDeProdutoId) {
      const categoriaDeProduto = await database.CategoriasDeProdutos.findByPk(
        dto.categoriaDeProdutoId
      );

      if (!categoriaDeProduto) {
        throw new Error("Product category not found.");
      }
    }

    const produtoByNome = await database.Produtos.findOne({
      where: {
        nome: { [Op.iLike]: dto.nome },
      },
    });

    if (produtoByNome) {
      throw new Error("There is already a product with this name.");
    }

    try {
      const newProduto = await database.Produtos.create({
        id: uuidv4(),
        nome: dto.nome,
        imagemUrl: dto.imagemUrl,
        descricao: dto.descricao,
        categoriaDeProdutoId: dto.categoriaDeProdutoId,
      });

      return newProduto;
    } catch (error) {
      console.error("Service error:", error.message);
      throw error;
    }
  }

  async get() {
    const produtos = await database.Produtos.findAll({
      include: [
        {
          model: database.CategoriasDeProdutos,
          as: "categoriaDeProduto",
        },
      ],
    });

    return produtos;
  }

  async getById(id) {
    const produto = await database.Produtos.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: database.CategoriasDeProdutos,
          as: "categoriaDeProduto",
        },
        {
          model: database.Cotacoes,
          as: "cotacoes",
        },
        {
          model: database.Fornecedores,
          as: "fornecedores",
          through: { attributes: [] },
        },
      ],
    });

    if (!produto) {
      throw new Error("Product not found.");
    }

    return produto;
  }

  async updateById(dto) {
    const produto = await database.Produtos.findOne({
      where: {
        id: dto.id,
      },
    });

    if (!produto) {
      throw new Error("Product not found.");
    }

    if (dto.categoriaDeProdutoId) {
      const categoriaDeProduto = await database.CategoriasDeProdutos.findByPk(
        dto.categoriaDeProdutoId
      );

      if (!categoriaDeProduto) {
        throw new Error("Product category not found.");
      }
    }

    const produtoByNome = await database.Produtos.findOne({
      where: {
        nome: { [Op.iLike]: dto.nome },
        id: { [Op.ne]: dto.id },
      },
    });

    if (produtoByNome) {
      throw new Error("There is already a product with this name.");
    }

    try {
      produto.nome = dto.nome;
      produto.imagemUrl = dto.imagemUrl;
      produto.descricao = dto.descricao;
      produto.categoriaDeProdutoId = dto.categoriaDeProdutoId;

      await produto.save();

      return await produto.reload();
    } catch (error) {
      console.error("Service error:", error.message);
      throw error;
    }
  }

  async deleteById(id) {
    const produto = await database.Produtos.findOne({
      where: {
        id: id,
      },
    });

    if (!produto) {
      throw new Error("Product not found.");
    }

    try {
      await database.Produtos.destroy({
        where: {
          id: id,
        },
      });
    } catch (error) {
      console.error("Service error:", error.message);
      throw error;
    }
  }
}

module.exports = ProdutoService;

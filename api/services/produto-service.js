const { v4: uuidv4 } = require("uuid");
const database = require("../models");

class ProdutoService {
  async create(dto) {
    if (dto.categoriaDeProdutoId) {
      const categoriaDeProduto = await database.CategoriasDeProdutos.findByPk(
        dto.categoriaDeProdutoId
      );

      if (!categoriaDeProduto) {
        throw new Error("Data not found.");
      }
    }

    const produto = await database.Produtos.findOne({
      where: {
        nome: dto.nome,
      },
    });

    if (produto) {
      throw new Error("Data already exists.");
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
          through: {
            attributes: [],
          },
        },
      ],
    });

    if (!produto) {
      throw new Error("Data not found.");
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
      throw new Error("Data not found.");
    }

    if (dto.categoriaDeProdutoId) {
      const categoriaDeProduto = await database.CategoriasDeProdutos.findByPk(
        dto.categoriaDeProdutoId
      );

      if (!categoriaDeProduto) {
        throw new Error("Data not found.");
      }
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
      throw new Error("Data not found.");
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

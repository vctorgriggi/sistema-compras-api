const { v4: uuidv4 } = require("uuid");
const database = require("../models");

class CategoriaDeProdutoService {
  async create(dto) {
    const categoriaDeProduto = await database.CategoriasDeProdutos.findOne({
      where: {
        nome: dto.nome,
      },
    });

    if (categoriaDeProduto) {
      throw new Error("Data already exists.");
    }

    try {
      const newCategoriaDeProduto = await database.CategoriasDeProdutos.create({
        id: uuidv4(),
        nome: dto.nome,
        imagemUrl: dto.imagemUrl,
      });

      return newCategoriaDeProduto;
    } catch (error) {
      console.error("service error:", error.message);
      throw error;
    }
  }

  async get() {
    const categoriasDeProdutos = await database.CategoriasDeProdutos.findAll();

    return categoriasDeProdutos;
  }

  async getById(id) {
    const categoriaDeProduto = await database.CategoriasDeProdutos.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: database.Produtos,
          as: "produtos",
        },
      ],
    });

    if (!categoriaDeProduto) {
      throw new Error("Data not found.");
    }

    return categoriaDeProduto;
  }

  async updateById(dto) {
    const categoriaDeProduto = await database.CategoriasDeProdutos.findOne({
      where: {
        id: dto.id,
      },
    });

    if (!categoriaDeProduto) {
      throw new Error("Data not found.");
    }

    try {
      categoriaDeProduto.nome = dto.nome;
      categoriaDeProduto.imagemUrl = dto.imagemUrl;

      await categoriaDeProduto.save();

      return await categoriaDeProduto.reload();
    } catch (error) {
      console.error("service error:", error.message);
      throw error;
    }
  }

  async deleteById(id) {
    const categoriaDeProduto = await database.CategoriasDeProdutos.findOne({
      where: {
        id: id,
      },
    });

    if (!categoriaDeProduto) {
      throw new Error("Data not found.");
    }

    try {
      await database.CategoriasDeProdutos.destroy({
        where: {
          id: id,
        },
      });
    } catch (error) {
      console.error("service error:", error.message);
      throw error;
    }
  }
}

module.exports = CategoriaDeProdutoService;

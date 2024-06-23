const { v4: uuidv4 } = require("uuid");
const database = require("../models");

class FornecedorService {
  async create(dto) {
    const fornecedor = await database.Fornecedores.findOne({
      where: {
        nome: dto.nome,
      },
    });

    if (fornecedor) {
      throw new Error("Data already exists.");
    }

    try {
      const newFornecedor = await database.Fornecedores.create({
        id: uuidv4(),
        nome: dto.nome,
        endereco: dto.endereco,
        telefone: dto.telefone,
        email: dto.email,
        cnpj: dto.cnpj,
      });

      return newFornecedor;
    } catch (error) {
      console.error("Service error:", error.message);
      throw error;
    }
  }

  async get() {
    const fornecedores = await database.Fornecedores.findAll();

    return fornecedores;
  }

  async getById(id) {
    const fornecedor = await database.Fornecedores.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: database.Contatos,
          as: "contatos",
        },
        {
          model: database.Cotacoes,
          as: "cotacoes",
        },
        {
          model: database.Produtos,
          as: "produtos",
          through: {
            attributes: [],
          },
        },
      ],
    });

    if (!fornecedor) {
      throw new Error("Data not found.");
    }

    return fornecedor;
  }

  async updateById(dto) {
    const fornecedor = await database.Fornecedores.findOne({
      where: {
        id: dto.id,
      },
    });

    if (!fornecedor) {
      throw new Error("Data not found.");
    }

    try {
      fornecedor.nome = dto.nome;
      fornecedor.endereco = dto.endereco;
      fornecedor.telefone = dto.telefone;
      fornecedor.email = dto.email;
      fornecedor.cnpj = dto.cnpj;

      await fornecedor.save();

      return await fornecedor.reload();
    } catch (error) {
      console.error("Service error:", error.message);
      throw error;
    }
  }

  async deleteById(id) {
    const fornecedor = await database.Fornecedores.findOne({
      where: {
        id: id,
      },
    });

    if (!fornecedor) {
      throw new Error("Data not found.");
    }

    try {
      await database.Fornecedores.destroy({
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

module.exports = FornecedorService;

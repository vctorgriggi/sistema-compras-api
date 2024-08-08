const { v4: uuidv4 } = require("uuid");

const database = require("../models");

class CotacaoService {
  async create(dto) {
    let fornecedor, produto;

    if (dto.fornecedorId) {
      fornecedor = await database.Fornecedores.findByPk(dto.fornecedorId);

      if (!fornecedor) {
        throw new Error("Supplier not found.");
      }
    }

    if (dto.produtoId) {
      produto = await database.Produtos.findByPk(dto.produtoId);

      if (!produto) {
        throw new Error("Product not found.");
      }
    }

    if (fornecedor && produto) {
      const isAssociated = await fornecedor.hasProduto(produto);

      if (!isAssociated) {
        throw new Error(
          "The association between supplier and product was not found."
        );
      }
    }

    try {
      const newCotacao = await database.Cotacoes.create({
        id: uuidv4(),
        validade: dto.validade,
        quantidade: dto.quantidade,
        valor: dto.valor,
        observacao: dto.observacao,
        fornecedorId: dto.fornecedorId,
        produtoId: dto.produtoId,
      });

      return newCotacao;
    } catch (error) {
      console.error("Service error:", error.message);
      throw error;
    }
  }

  async get() {
    const cotacoes = await database.Cotacoes.findAll({
      include: [
        {
          model: database.Fornecedores,
          as: "fornecedor",
        },
        {
          model: database.Produtos,
          as: "produto",
        },
      ],
    });

    return cotacoes;
  }

  async getById(id) {
    const cotacao = await database.Cotacoes.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: database.Fornecedores,
          as: "fornecedor",
        },
        {
          model: database.Produtos,
          as: "produto",
        },
      ],
    });

    if (!cotacao) {
      throw new Error("Quotation not found.");
    }

    return cotacao;
  }

  async updateById(dto) {
    const cotacao = await database.Cotacoes.findOne({
      where: {
        id: dto.id,
      },
    });

    if (!cotacao) {
      throw new Error("Quotation not found.");
    }

    let fornecedor, produto;

    if (dto.fornecedorId) {
      fornecedor = await database.Fornecedores.findByPk(dto.fornecedorId);

      if (!fornecedor) {
        throw new Error("Supplier not found.");
      }
    }

    if (dto.produtoId) {
      produto = await database.Produtos.findByPk(dto.produtoId);

      if (!produto) {
        throw new Error("Product not found.");
      }
    }

    if (fornecedor && produto) {
      const isAssociated = await fornecedor.hasProduto(produto);

      if (!isAssociated) {
        throw new Error(
          "The association between supplier and product was not found."
        );
      }
    }

    try {
      cotacao.validade = dto.validade;
      cotacao.quantidade = dto.quantidade;
      cotacao.valor = dto.valor;
      cotacao.observacao = dto.observacao;
      cotacao.fornecedorId = dto.fornecedorId;
      cotacao.produtoId = dto.produtoId;

      await cotacao.save();

      return await cotacao.reload();
    } catch (error) {
      console.error("Service error:", error.message);
      throw error;
    }
  }

  async deleteById(id) {
    const cotacao = await database.Cotacoes.findOne({
      where: {
        id: id,
      },
    });

    if (!cotacao) {
      throw new Error("Quotation not found.");
    }

    try {
      await database.Cotacoes.destroy({
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

module.exports = CotacaoService;

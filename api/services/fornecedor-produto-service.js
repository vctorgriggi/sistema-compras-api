const database = require("../models");

class FornecedorProdutoService {
  async add(dto) {
    const fornecedor = await database.Fornecedores.findByPk(dto.fornecedorId);
    const produto = await database.Produtos.findByPk(dto.produtoId);

    if (!fornecedor || !produto) {
      throw new Error("Some data was not found.");
    }

    const existingAssociation = await fornecedor.hasProduto(produto);

    if (existingAssociation) {
      throw new Error("Association already exists.");
    }

    await fornecedor.addProduto(produto);
  }

  async remove(dto) {
    const fornecedor = await database.Fornecedores.findByPk(dto.fornecedorId);
    const produto = await database.Produtos.findByPk(dto.produtoId);

    if (!fornecedor || !produto) {
      throw new Error("Some data was not found.");
    }

    await fornecedor.removeProduto(produto);
  }
}

module.exports = FornecedorProdutoService;

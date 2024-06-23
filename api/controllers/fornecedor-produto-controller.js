const FornecedorProdutoService = require("../services/fornecedor-produto-service");
const fornecedorProdutoService = new FornecedorProdutoService();

class FornecedorProdutoController {
  static async add(req, res) {
    const { produtoId } = req.params;
    const { fornecedorId } = req.body;

    try {
      await fornecedorProdutoService.add({
        produtoId,
        fornecedorId,
      });

      res.status(200).send();
    } catch (error) {
      console.log("Controller error:", error.message);
      res.status(400).send(error.message);
    }
  }

  static async remove(req, res) {
    const { produtoId } = req.params;
    const { fornecedorId } = req.body;

    try {
      await fornecedorProdutoService.remove({
        produtoId,
        fornecedorId,
      });

      res.status(204).send();
    } catch (error) {
      console.log("Controller error:", error.message);
      res.status(400).send(error.message);
    }
  }
}

module.exports = FornecedorProdutoController;

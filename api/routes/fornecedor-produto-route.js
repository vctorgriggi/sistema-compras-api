const { Router } = require("express");
const FornecedorProdutoController = require("../controllers/fornecedor-produto-controller");

const router = Router();

router
  .post("/produto-id/:produtoId", FornecedorProdutoController.add)
  .delete("/produto-id/:produtoId", FornecedorProdutoController.remove);

module.exports = router;

const { Router } = require("express");

const FornecedorProdutoController = require("../controllers/fornecedor-produto-controller");

const router = Router();

router
  .post("/:produtoId", FornecedorProdutoController.add)
  .delete("/:produtoId", FornecedorProdutoController.remove);

module.exports = router;

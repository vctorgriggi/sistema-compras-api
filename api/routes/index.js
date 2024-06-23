const express = require("express");
const router = express.Router();

const fornecedorRouter = require("./fornecedor-route");
const categoriaDeProdutoRouter = require("./categoria-de-produto-route");
const contatoRouter = require("./contato-route");
const produtoRouter = require("./produto-route");
const fornecedorProdutoRouter = require("./fornecedor-produto-route");
const cotacaoRouter = require("./cotacao-route");

router
  .use("/fornecedor", fornecedorRouter)
  .use("/c-produto", categoriaDeProdutoRouter)
  .use("/contato", contatoRouter)
  .use("/produto", produtoRouter)
  .use("/fp", fornecedorProdutoRouter)
  .use("/cotacao", cotacaoRouter);

module.exports = router;

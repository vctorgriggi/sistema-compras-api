const { Router } = require("express");
const CategoriaDeProdutoController = require("../controllers/categoria-de-produto-controller");

const router = Router();

router
  .post("/", CategoriaDeProdutoController.create)
  .get("/", CategoriaDeProdutoController.get)
  .get("/id/:id", CategoriaDeProdutoController.getById)
  .put("/id/:id", CategoriaDeProdutoController.updateById)
  .delete("/id/:id", CategoriaDeProdutoController.deleteById);

module.exports = router;

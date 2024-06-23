const { Router } = require("express");
const ProdutoController = require("../controllers/produto-controller");

const router = Router();

router
  .post("/", ProdutoController.create)
  .get("/", ProdutoController.get)
  .get("/id/:id", ProdutoController.getById)
  .put("/id/:id", ProdutoController.updateById)
  .delete("/id/:id", ProdutoController.deleteById);

module.exports = router;

const { Router } = require("express");

const CotacaoController = require("../controllers/cotacao-controller");

const router = Router();

router
  .post("/", CotacaoController.create)
  .get("/", CotacaoController.get)
  .get("/:id", CotacaoController.getById)
  .put("/:id", CotacaoController.updateById)
  .delete("/:id", CotacaoController.deleteById);

module.exports = router;

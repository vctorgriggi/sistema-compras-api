const { Router } = require("express");

const FornecedorController = require("../controllers/fornecedor-controller");

const router = Router();

router
  .post("/", FornecedorController.create)
  .get("/", FornecedorController.get)
  .get("/:id", FornecedorController.getById)
  .put("/:id", FornecedorController.updateById)
  .delete("/:id", FornecedorController.deleteById);

module.exports = router;

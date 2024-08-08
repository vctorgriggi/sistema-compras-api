const { Router } = require("express");

const ContatoController = require("../controllers/contato-controller");

const router = Router();

router
  .post("/", ContatoController.create)
  .get("/", ContatoController.get)
  .get("/:id", ContatoController.getById)
  .put("/:id", ContatoController.updateById)
  .delete("/:id", ContatoController.deleteById);

module.exports = router;

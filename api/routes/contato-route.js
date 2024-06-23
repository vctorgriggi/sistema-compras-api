const { Router } = require("express");
const ContatoController = require("../controllers/contato-controller");

const router = Router();

router
  .post("/", ContatoController.create)
  .get("/", ContatoController.get)
  .get("/id/:id", ContatoController.getById)
  .put("/id/:id", ContatoController.updateById)
  .delete("/id/:id", ContatoController.deleteById);

module.exports = router;

const { Router } = require("express");

const CategoriaDeProdutoController = require("../controllers/categoria-de-produto-controller");
const upload = require("../middlewares/upload");

const router = Router();

router
  .post("/", upload.single("file"), CategoriaDeProdutoController.create)
  .get("/", CategoriaDeProdutoController.get)
  .get("/:id", CategoriaDeProdutoController.getById)
  .put("/:id", upload.single("file"), CategoriaDeProdutoController.updateById)
  .delete("/:id", CategoriaDeProdutoController.deleteById);

module.exports = router;

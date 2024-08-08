const { Router } = require("express");

const ProdutoController = require("../controllers/produto-controller");
const upload = require("../middlewares/upload");

const router = Router();

router
  .post("/", upload.single("file"), ProdutoController.create)
  .get("/", ProdutoController.get)
  .get("/:id", ProdutoController.getById)
  .put("/:id", upload.single("file"), ProdutoController.updateById)
  .delete("/:id", ProdutoController.deleteById);

module.exports = router;

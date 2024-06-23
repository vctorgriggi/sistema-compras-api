const CategoriaDeProdutoService = require("../services/categoria-de-produto-service");
const categoriaDeProdutoService = new CategoriaDeProdutoService();

class CategoriaDeProdutoController {
  static async create(req, res) {
    const { nome, imagemUrl } = req.body;

    try {
      await categoriaDeProdutoService.create({
        nome,
        imagemUrl,
      });

      res.status(201).send();
    } catch (error) {
      console.log("Controller error:", error.message);
      res.status(400).send(error.message);
    }
  }

  static async get(req, res) {
    const categoriasDeProdutos = await categoriaDeProdutoService.get();

    res.status(200).json(categoriasDeProdutos);
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;
      const categoriaDeProduto = await categoriaDeProdutoService.getById(id);

      res.status(200).json(categoriaDeProduto);
    } catch (error) {
      console.log("Controller error:", error.message);
      res.status(400).send(error.message);
    }
  }

  static async updateById(req, res) {
    const { id } = req.params;
    const { nome, imagemUrl } = req.body;

    try {
      const categoriaDeProduto = await categoriaDeProdutoService.updateById({
        id,
        nome,
        imagemUrl,
      });

      res.status(200).json(categoriaDeProduto);
    } catch (error) {
      console.log("Controller error:", error.message);
      res.status(400).send(error.message);
    }
  }

  static async deleteById(req, res) {
    const { id } = req.params;

    try {
      await categoriaDeProdutoService.deleteById(id);

      res.status(204).send();
    } catch (error) {
      console.log("Controller error:", error.message);
      res.status(400).send(error.message);
    }
  }
}

module.exports = CategoriaDeProdutoController;

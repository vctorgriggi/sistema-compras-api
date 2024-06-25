const ProdutoService = require("../services/produto-service");
const produtoService = new ProdutoService();

class ProdutoController {
  static async create(req, res) {
    const { nome, imagemUrl, descricao, categoriaDeProdutoId } = req.body;

    try {
      await produtoService.create({
        nome,
        imagemUrl,
        descricao,
        categoriaDeProdutoId,
      });

      res.status(201).send();
    } catch (error) {
      console.log("controller error:", error.message);
      res.status(400).send({ message: error.message });
    }
  }

  static async get(req, res) {
    const produtos = await produtoService.get();

    res.status(200).json(produtos);
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;
      const produto = await produtoService.getById(id);

      res.status(200).json(produto);
    } catch (error) {
      console.log("controller error:", error.message);
      res.status(400).send({ message: error.message });
    }
  }

  static async updateById(req, res) {
    const { id } = req.params;
    const { nome, imagemUrl, descricao, categoriaDeProdutoId } = req.body;

    try {
      const produto = await produtoService.updateById({
        id,
        nome,
        imagemUrl,
        descricao,
        categoriaDeProdutoId,
      });

      res.status(200).json(produto);
    } catch (error) {
      console.log("controller error:", error.message);
      res.status(400).send({ message: error.message });
    }
  }

  static async deleteById(req, res) {
    const { id } = req.params;

    try {
      await produtoService.deleteById(id);

      res.status(204).send();
    } catch (error) {
      console.log("controller error:", error.message);
      res.status(400).send({ message: error.message });
    }
  }
}

module.exports = ProdutoController;

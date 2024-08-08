const ProdutoService = require("../services/produto-service");
const deleteFile = require("../utils/delete-file");

const produtoService = new ProdutoService();

class ProdutoController {
  static async create(req, res) {
    const { nome, descricao, categoriaDeProdutoId } = req.body;
    const imagemUrl = req.file ? req.file.path : null;

    try {
      await produtoService.create({
        nome,
        imagemUrl,
        descricao,
        categoriaDeProdutoId,
      });

      return res.status(201).send();
    } catch (error) {
      if (imagemUrl) deleteFile(imagemUrl);
      console.log("Controller error:", error.message);
      return res.status(400).send({ message: error.message });
    }
  }

  static async get(req, res) {
    try {
      const produtos = await produtoService.get();

      res.status(200).json(produtos);
    } catch (error) {
      console.log("Controller error:", error.message);
      return res.status(400).send({ message: error.message });
    }
  }

  static async getById(req, res) {
    const { id } = req.params;

    try {
      const produto = await produtoService.getById(id);

      return res.status(200).json(produto);
    } catch (error) {
      console.log("Controller error:", error.message);
      return res.status(400).send({ message: error.message });
    }
  }

  static async updateById(req, res) {
    const { id } = req.params;
    const { nome, descricao, categoriaDeProdutoId, unsetImage } = req.body;
    const imagemUrl = req.file ? req.file.path : null;

    try {
      const current = await produtoService.getById(id);

      const toUpdate = { id, nome, descricao, categoriaDeProdutoId };

      if (imagemUrl) {
        toUpdate.imagemUrl = imagemUrl;
      } else if (unsetImage) {
        toUpdate.imagemUrl = null;
      }

      const modified = await produtoService.updateById(toUpdate);

      if (current.imagemUrl && imagemUrl) {
        deleteFile(current.imagemUrl);
      }

      return res.status(200).json(modified);
    } catch (error) {
      if (imagemUrl) deleteFile(imagemUrl);
      console.log("Controller error:", error.message);
      return res.status(400).send({ message: error.message });
    }
  }

  static async deleteById(req, res) {
    const { id } = req.params;

    try {
      const produto = await produtoService.getById(id);

      await produtoService.deleteById(id);

      if (produto.imagemUrl) {
        deleteFile(produto.imagemUrl);
      }

      return res.status(204).send();
    } catch (error) {
      console.log("Controller error:", error.message);
      return res.status(400).send({ message: error.message });
    }
  }
}

module.exports = ProdutoController;

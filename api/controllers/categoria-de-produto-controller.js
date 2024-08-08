const CategoriaDeProdutoService = require("../services/categoria-de-produto-service");
const deleteFile = require("../utils/delete-file");

const categoriaDeProdutoService = new CategoriaDeProdutoService();

class CategoriaDeProdutoController {
  static async create(req, res) {
    const { nome } = req.body;
    const imagemUrl = req.file ? req.file.path : null;

    try {
      const categoriaDeProduto = await categoriaDeProdutoService.create({
        nome,
        imagemUrl,
      });

      return res.status(201).json(categoriaDeProduto);
    } catch (error) {
      if (imagemUrl) deleteFile(imagemUrl);
      console.log("Controller error:", error.message);
      return res.status(400).send({ message: error.message });
    }
  }

  static async get(req, res) {
    try {
      const categoriasDeProdutos = await categoriaDeProdutoService.get();

      return res.status(200).json(categoriasDeProdutos);
    } catch (error) {
      console.log("Controller error:", error.message);
      return res.status(400).send({ message: error.message });
    }
  }

  static async getById(req, res) {
    const { id } = req.params;

    try {
      const categoriaDeProduto = await categoriaDeProdutoService.getById(id);

      return res.status(200).json(categoriaDeProduto);
    } catch (error) {
      console.log("Controller error:", error.message);
      return res.status(400).send({ message: error.message });
    }
  }

  static async updateById(req, res) {
    const { id } = req.params;
    const { nome, unsetImage } = req.body;
    const imagemUrl = req.file ? req.file.path : null;

    try {
      const current = await categoriaDeProdutoService.getById(id);

      const toUpdate = { id, nome };

      if (imagemUrl) {
        toUpdate.imagemUrl = imagemUrl;
      } else if (unsetImage) {
        toUpdate.imagemUrl = null;
      }

      const modified = await categoriaDeProdutoService.updateById(toUpdate);

      if (current.imagemUrl && (imagemUrl || unsetImage)) {
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
      const categoriaDeProduto = await categoriaDeProdutoService.getById(id);

      await categoriaDeProdutoService.deleteById(id);

      if (categoriaDeProduto.imagemUrl) {
        deleteFile(categoriaDeProduto.imagemUrl);
      }

      return res.status(204).send();
    } catch (error) {
      console.log("Controller error:", error.message);
      return res.status(400).send({ message: error.message });
    }
  }
}

module.exports = CategoriaDeProdutoController;

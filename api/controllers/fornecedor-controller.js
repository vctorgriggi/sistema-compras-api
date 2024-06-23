const FornecedorService = require("../services/fornecedor-service.js");
const fornecedorService = new FornecedorService();

class FornecedorController {
  static async create(req, res) {
    const { nome, endereco, telefone, email, cnpj } = req.body;

    try {
      await fornecedorService.create({
        nome,
        endereco,
        telefone,
        email,
        cnpj,
      });

      res.status(201).send();
    } catch (error) {
      console.log("Controller error:", error.message);
      res.status(400).send(error.message);
    }
  }

  static async get(req, res) {
    const fornecedores = await fornecedorService.get();

    res.status(200).json(fornecedores);
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;
      const fornecedor = await fornecedorService.getById(id);

      res.status(200).json(fornecedor);
    } catch (error) {
      console.log("Controller error:", error.message);
      res.status(400).send(error.message);
    }
  }

  static async updateById(req, res) {
    const { id } = req.params;
    const { nome, endereco, telefone, email, cnpj } = req.body;

    try {
      const fornecedor = await fornecedorService.updateById({
        id,
        nome,
        endereco,
        telefone,
        email,
        cnpj,
      });

      res.status(200).json(fornecedor);
    } catch (error) {
      console.log("Controller error:", error.message);
      res.status(400).send(error.message);
    }
  }

  static async deleteById(req, res) {
    const { id } = req.params;

    try {
      await fornecedorService.deleteById(id);

      res.status(204).send();
    } catch (error) {
      console.log("Controller error:", error.message);
      res.status(400).send(error.message);
    }
  }
}

module.exports = FornecedorController;

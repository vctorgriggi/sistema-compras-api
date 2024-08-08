const FornecedorService = require("../services/fornecedor-service");

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

      return res.status(201).send();
    } catch (error) {
      console.log("Controller error:", error.message);
      return res.status(400).send({ message: error.message });
    }
  }

  static async get(req, res) {
    try {
      const fornecedores = await fornecedorService.get();

      res.status(200).json(fornecedores);
    } catch (error) {
      console.log("Controller error:", error.message);
      return res.status(400).send({ message: error.message });
    }
  }

  static async getById(req, res) {
    const { id } = req.params;

    try {
      const fornecedor = await fornecedorService.getById(id);

      return res.status(200).json(fornecedor);
    } catch (error) {
      console.log("Controller error:", error.message);
      return res.status(400).send({ message: error.message });
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

      return res.status(200).json(fornecedor);
    } catch (error) {
      console.log("Controller error:", error.message);
      return res.status(400).send({ message: error.message });
    }
  }

  static async deleteById(req, res) {
    const { id } = req.params;

    try {
      await fornecedorService.deleteById(id);

      return res.status(204).send();
    } catch (error) {
      console.log("Controller error:", error.message);
      return res.status(400).send({ message: error.message });
    }
  }
}

module.exports = FornecedorController;

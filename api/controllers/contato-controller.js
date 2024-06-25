const ContatoService = require("../services/contato-service.js");
const contatoService = new ContatoService();

class ContatoController {
  static async create(req, res) {
    const { nome, telefone, email, cargo, fornecedorId } = req.body;

    try {
      await contatoService.create({
        nome,
        telefone,
        email,
        cargo,
        fornecedorId,
      });

      res.status(201).send();
    } catch (error) {
      console.log("controller error:", error.message);
      res.status(400).send({ message: error.message });
    }
  }

  static async get(req, res) {
    const contatos = await contatoService.get();

    res.status(200).json(contatos);
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;
      const contato = await contatoService.getById(id);

      res.status(200).json(contato);
    } catch (error) {
      console.log("controller error:", error.message);
      res.status(400).send({ message: error.message });
    }
  }

  static async updateById(req, res) {
    const { id } = req.params;
    const { nome, telefone, email, cargo, fornecedorId } = req.body;

    try {
      const contato = await contatoService.updateById({
        id,
        nome,
        telefone,
        email,
        cargo,
        fornecedorId,
      });

      res.status(200).json(contato);
    } catch (error) {
      console.log("controller error:", error.message);
      res.status(400).send({ message: error.message });
    }
  }

  static async deleteById(req, res) {
    const { id } = req.params;

    try {
      await contatoService.deleteById(id);

      res.status(204).send();
    } catch (error) {
      console.log("controller error:", error.message);
      res.status(400).send({ message: error.message });
    }
  }
}

module.exports = ContatoController;

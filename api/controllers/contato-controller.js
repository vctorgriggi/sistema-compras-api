const ContatoService = require("../services/contato-service");

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

      return res.status(201).send();
    } catch (error) {
      console.log("Controller error:", error.message);
      return res.status(400).send({ message: error.message });
    }
  }

  static async get(req, res) {
    try {
      const contatos = await contatoService.get();

      return res.status(200).json(contatos);
    } catch (error) {
      console.log("Controller error:", error.message);
      return res.status(400).send({ message: error.message });
    }
  }

  static async getById(req, res) {
    const { id } = req.params;

    try {
      const contato = await contatoService.getById(id);

      return res.status(200).json(contato);
    } catch (error) {
      console.log("Controller error:", error.message);
      return res.status(400).send({ message: error.message });
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

      return res.status(200).json(contato);
    } catch (error) {
      console.log("Controller error:", error.message);
      return res.status(400).send({ message: error.message });
    }
  }

  static async deleteById(req, res) {
    const { id } = req.params;

    try {
      await contatoService.deleteById(id);

      return res.status(204).send();
    } catch (error) {
      console.log("Controller error:", error.message);
      return res.status(400).send({ message: error.message });
    }
  }
}

module.exports = ContatoController;

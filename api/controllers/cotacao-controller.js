const CotacaoService = require("../services/cotacao-service");

const cotacaoService = new CotacaoService();

class CotacaoController {
  static async create(req, res) {
    const { validade, quantidade, valor, observacao, fornecedorId, produtoId } =
      req.body;

    try {
      await cotacaoService.create({
        validade,
        quantidade,
        valor,
        observacao,
        fornecedorId,
        produtoId,
      });

      return res.status(201).send();
    } catch (error) {
      console.log("Controller error:", error.message);
      return res.status(400).send({ message: error.message });
    }
  }

  static async get(req, res) {
    try {
      const cotacoes = await cotacaoService.get();

      res.status(200).json(cotacoes);
    } catch (error) {
      console.log("Controller error:", error.message);
      return res.status(400).send({ message: error.message });
    }
  }

  static async getById(req, res) {
    const { id } = req.params;

    try {
      const cotacao = await cotacaoService.getById(id);

      return res.status(200).json(cotacao);
    } catch (error) {
      console.log("Controller error:", error.message);
      return res.status(400).send({ message: error.message });
    }
  }

  static async updateById(req, res) {
    const { id } = req.params;
    const { validade, quantidade, valor, observacao, fornecedorId, produtoId } =
      req.body;

    try {
      const cotacao = await cotacaoService.updateById({
        id,
        validade,
        quantidade,
        valor,
        observacao,
        fornecedorId,
        produtoId,
      });

      return res.status(200).json(cotacao);
    } catch (error) {
      console.log("Controller error:", error.message);
      return res.status(400).send({ message: error.message });
    }
  }

  static async deleteById(req, res) {
    const { id } = req.params;

    try {
      await cotacaoService.deleteById(id);

      return res.status(204).send();
    } catch (error) {
      console.log("Controller error:", error.message);
      return res.status(400).send({ message: error.message });
    }
  }
}

module.exports = CotacaoController;

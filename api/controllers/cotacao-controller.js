const CotacaoService = require("../services/cotacao-service");
const cotacaoService = new CotacaoService();

class CotacaoController {
  static async create(req, res) {
    const { validade, quantidade, valor, fornecedorId, produtoId } = req.body;

    try {
      await cotacaoService.create({
        validade,
        quantidade,
        valor,
        fornecedorId,
        produtoId,
      });

      res.status(201).send();
    } catch (error) {
      console.log("controller error:", error.message);
      res.status(400).send(error.message);
    }
  }

  static async get(req, res) {
    const cotacoes = await cotacaoService.get();

    res.status(200).json(cotacoes);
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;
      const cotacao = await cotacaoService.getById(id);

      res.status(200).json(cotacao);
    } catch (error) {
      console.log("controller error:", error.message);
      res.status(400).send(error.message);
    }
  }

  static async updateById(req, res) {
    const { id } = req.params;
    const { validade, quantidade, valor, fornecedorId, produtoId } = req.body;

    try {
      const cotacao = await cotacaoService.updateById({
        id,
        validade,
        quantidade,
        valor,
        fornecedorId,
        produtoId,
      });

      res.status(200).json(cotacao);
    } catch (error) {
      console.log("controller error:", error.message);
      res.status(400).send(error.message);
    }
  }

  static async deleteById(req, res) {
    const { id } = req.params;

    try {
      await cotacaoService.deleteById(id);

      res.status(204).send();
    } catch (error) {
      console.log("controller error:", error.message);
      res.status(400).send(error.message);
    }
  }
}

module.exports = CotacaoController;

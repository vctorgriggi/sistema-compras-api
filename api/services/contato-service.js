const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");
const database = require("../models");

class ContatoService {
  async create(dto) {
    if (dto.fornecedorId) {
      const fornecedor = await database.Fornecedores.findByPk(dto.fornecedorId);

      if (!fornecedor) {
        throw new Error("Data not found.");
      }
    }

    const contatoByEmail = await database.Contatos.findOne({
      where: {
        email: dto.email,
      },
    });

    if (contatoByEmail) {
      throw new Error("There is already a contact with this email address.");
    }

    try {
      const newContato = await database.Contatos.create({
        id: uuidv4(),
        nome: dto.nome,
        telefone: dto.telefone,
        email: dto.email,
        cargo: dto.cargo,
        fornecedorId: dto.fornecedorId,
      });

      return newContato;
    } catch (error) {
      console.error("service error:", error.message);
      throw error;
    }
  }

  async get() {
    const contatos = await database.Contatos.findAll({
      include: [
        {
          model: database.Fornecedores,
          as: "fornecedor",
        },
      ],
    });

    return contatos;
  }

  async getById(id) {
    const contato = await database.Contatos.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: database.Fornecedores,
          as: "fornecedor",
        },
      ],
    });

    if (!contato) {
      throw new Error("Data not found.");
    }

    return contato;
  }

  async updateById(dto) {
    const contato = await database.Contatos.findOne({
      where: {
        id: dto.id,
      },
    });

    if (!contato) {
      throw new Error("Data not found.");
    }

    if (dto.fornecedorId) {
      const fornecedor = await database.Fornecedores.findByPk(dto.fornecedorId);

      if (!fornecedor) {
        throw new Error("Data not found.");
      }
    }

    const contatoByEmail = await database.Contatos.findOne({
      where: {
        email: dto.email,
        id: { [Op.ne]: dto.id },
      },
    });

    if (contatoByEmail) {
      throw new Error("There is already a contact with this email address.");
    }

    try {
      contato.nome = dto.nome;
      contato.telefone = dto.telefone;
      contato.email = dto.email;
      contato.cargo = dto.cargo;
      contato.fornecedorId = dto.fornecedorId;

      await contato.save();

      return await contato.reload();
    } catch (error) {
      console.error("service error:", error.message);
      throw error;
    }
  }

  async deleteById(id) {
    const contato = await database.Contatos.findOne({
      where: {
        id: id,
      },
    });

    if (!contato) {
      throw new Error("Data not found.");
    }

    try {
      await database.Contatos.destroy({
        where: {
          id: id,
        },
      });
    } catch (error) {
      console.error("service error:", error.message);
      throw error;
    }
  }
}

module.exports = ContatoService;

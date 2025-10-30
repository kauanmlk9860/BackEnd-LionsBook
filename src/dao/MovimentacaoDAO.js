const { PrismaClient } = require('../../generated/prisma');
const Movimentacao = require('../models/Movimentacao');

const prisma = new PrismaClient();

class MovimentacaoDAO {
  async criar(movimentacao) {
    try {
      const novaMovimentacao = await prisma.tbl_movimentacao.create({
        data: movimentacao.toPrisma()
      });
      return Movimentacao.fromPrisma(novaMovimentacao);
    } catch (error) {
      throw new Error(`Erro ao criar movimentação: ${error.message}`);
    }
  }

  async buscarPorId(id) {
    try {
      const movimentacao = await prisma.tbl_movimentacao.findUnique({
        where: { id: parseInt(id) },
        include: {
          usuario: true,
          livro: true,
          tipo_movimentacao: true
        }
      });
      return movimentacao ? Movimentacao.fromPrisma(movimentacao) : null;
    } catch (error) {
      throw new Error(`Erro ao buscar movimentação: ${error.message}`);
    }
  }

  async buscarTodos() {
    try {
      const movimentacoes = await prisma.tbl_movimentacao.findMany({
        include: {
          usuario: true,
          livro: true,
          tipo_movimentacao: true
        }
      });
      return movimentacoes.map(movimentacao => Movimentacao.fromPrisma(movimentacao));
    } catch (error) {
      throw new Error(`Erro ao buscar movimentações: ${error.message}`);
    }
  }

  async atualizar(id, movimentacao) {
    try {
      const movimentacaoAtualizada = await prisma.tbl_movimentacao.update({
        where: { id: parseInt(id) },
        data: movimentacao.toPrisma()
      });
      return Movimentacao.fromPrisma(movimentacaoAtualizada);
    } catch (error) {
      throw new Error(`Erro ao atualizar movimentação: ${error.message}`);
    }
  }

  async deletar(id) {
    try {
      await prisma.tbl_movimentacao.delete({
        where: { id: parseInt(id) }
      });
      return true;
    } catch (error) {
      throw new Error(`Erro ao deletar movimentação: ${error.message}`);
    }
  }

  async buscarPorUsuario(idUsuario) {
    try {
      const movimentacoes = await prisma.tbl_movimentacao.findMany({
        where: { id_usuario: parseInt(idUsuario) },
        include: {
          usuario: true,
          livro: true,
          tipo_movimentacao: true
        }
      });
      return movimentacoes.map(movimentacao => Movimentacao.fromPrisma(movimentacao));
    } catch (error) {
      throw new Error(`Erro ao buscar movimentações por usuário: ${error.message}`);
    }
  }

  async buscarPorLivro(idLivro) {
    try {
      const movimentacoes = await prisma.tbl_movimentacao.findMany({
        where: { id_livro: parseInt(idLivro) },
        include: {
          usuario: true,
          livro: true,
          tipo_movimentacao: true
        }
      });
      return movimentacoes.map(movimentacao => Movimentacao.fromPrisma(movimentacao));
    } catch (error) {
      throw new Error(`Erro ao buscar movimentações por livro: ${error.message}`);
    }
  }

  async buscarPorPeriodo(dataInicio, dataFim) {
    try {
      const movimentacoes = await prisma.tbl_movimentacao.findMany({
        where: {
          data_movimentacao: {
            gte: new Date(dataInicio),
            lte: new Date(dataFim)
          }
        },
        include: {
          usuario: true,
          livro: true,
          tipo_movimentacao: true
        }
      });
      return movimentacoes.map(movimentacao => Movimentacao.fromPrisma(movimentacao));
    } catch (error) {
      throw new Error(`Erro ao buscar movimentações por período: ${error.message}`);
    }
  }
}

module.exports = MovimentacaoDAO;

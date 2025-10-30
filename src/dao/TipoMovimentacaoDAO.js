const { PrismaClient } = require('../../generated/prisma');
const TipoMovimentacao = require('../models/TipoMovimentacao');

const prisma = new PrismaClient();

class TipoMovimentacaoDAO {
  async criar(tipoMovimentacao) {
    try {
      const novoTipoMovimentacao = await prisma.tipo_movimentacao.create({
        data: tipoMovimentacao.toPrisma()
      });
      return TipoMovimentacao.fromPrisma(novoTipoMovimentacao);
    } catch (error) {
      throw new Error(`Erro ao criar tipo de movimentação: ${error.message}`);
    }
  }

  async buscarPorId(id) {
    try {
      const tipoMovimentacao = await prisma.tipo_movimentacao.findUnique({
        where: { id: parseInt(id) }
      });
      return tipoMovimentacao ? TipoMovimentacao.fromPrisma(tipoMovimentacao) : null;
    } catch (error) {
      throw new Error(`Erro ao buscar tipo de movimentação: ${error.message}`);
    }
  }

  async buscarTodos() {
    try {
      const tiposMovimentacao = await prisma.tipo_movimentacao.findMany();
      return tiposMovimentacao.map(tipo => TipoMovimentacao.fromPrisma(tipo));
    } catch (error) {
      throw new Error(`Erro ao buscar tipos de movimentação: ${error.message}`);
    }
  }

  async atualizar(id, tipoMovimentacao) {
    try {
      const tipoMovimentacaoAtualizado = await prisma.tipo_movimentacao.update({
        where: { id: parseInt(id) },
        data: tipoMovimentacao.toPrisma()
      });
      return TipoMovimentacao.fromPrisma(tipoMovimentacaoAtualizado);
    } catch (error) {
      throw new Error(`Erro ao atualizar tipo de movimentação: ${error.message}`);
    }
  }

  async deletar(id) {
    try {
      await prisma.tipo_movimentacao.delete({
        where: { id: parseInt(id) }
      });
      return true;
    } catch (error) {
      throw new Error(`Erro ao deletar tipo de movimentação: ${error.message}`);
    }
  }

  async buscarPorTipo(tipo) {
    try {
      const tipoMovimentacao = await prisma.tipo_movimentacao.findFirst({
        where: { tipo: tipo }
      });
      return tipoMovimentacao ? TipoMovimentacao.fromPrisma(tipoMovimentacao) : null;
    } catch (error) {
      throw new Error(`Erro ao buscar tipo de movimentação por tipo: ${error.message}`);
    }
  }
}

module.exports = TipoMovimentacaoDAO;

const { PrismaClient } = require('@prisma/client');
const Livro = require('../models/Livro');

const prisma = new PrismaClient();

class LivroDAO {
  async criar(livro) {
    try {
      const novoLivro = await prisma.tbl_livro.create({
        data: livro.toPrisma()
      });
      return Livro.fromPrisma(novoLivro);
    } catch (error) {
      throw new Error(`Erro ao criar livro: ${error.message}`);
    }
  }

  async buscarPorId(id) {
    try {
      const livro = await prisma.tbl_livro.findUnique({
        where: { id: parseInt(id) }
      });
      return livro ? Livro.fromPrisma(livro) : null;
    } catch (error) {
      throw new Error(`Erro ao buscar livro: ${error.message}`);
    }
  }

  async buscarTodos() {
    try {
      const livros = await prisma.tbl_livro.findMany();
      return livros.map(livro => Livro.fromPrisma(livro));
    } catch (error) {
      throw new Error(`Erro ao buscar livros: ${error.message}`);
    }
  }

  async atualizar(id, livro) {
    try {
      const livroAtualizado = await prisma.tbl_livro.update({
        where: { id: parseInt(id) },
        data: livro.toPrisma()
      });
      return Livro.fromPrisma(livroAtualizado);
    } catch (error) {
      throw new Error(`Erro ao atualizar livro: ${error.message}`);
    }
  }

  async deletar(id) {
    try {
      await prisma.tbl_livro.delete({
        where: { id: parseInt(id) }
      });
      return true;
    } catch (error) {
      throw new Error(`Erro ao deletar livro: ${error.message}`);
    }
  }

  async buscarPorTitulo(titulo) {
    try {
      const livros = await prisma.tbl_livro.findMany({
        where: {
          titulo: {
            contains: titulo
          }
        }
      });
      return livros.map(livro => Livro.fromPrisma(livro));
    } catch (error) {
      throw new Error(`Erro ao buscar livros por título: ${error.message}`);
    }
  }

  async buscarPorIsbn(isbn) {
    try {
      const livro = await prisma.tbl_livro.findFirst({
        where: { isbn: isbn }
      });
      return livro ? Livro.fromPrisma(livro) : null;
    } catch (error) {
      throw new Error(`Erro ao buscar livro por ISBN: ${error.message}`);
    }
  }
}

module.exports = LivroDAO;

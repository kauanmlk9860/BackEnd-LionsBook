const { PrismaClient } = require('../../generated/prisma');
const Usuario = require('../models/Usuario');

const prisma = new PrismaClient();

class UsuarioDAO {
  async criar(usuario) {
    try {
      const novoUsuario = await prisma.tbl_usuario.create({
        data: usuario.toPrisma()
      });
      return Usuario.fromPrisma(novoUsuario);
    } catch (error) {
      throw new Error(`Erro ao criar usuário: ${error.message}`);
    }
  }

  async buscarPorId(id) {
    try {
      const usuario = await prisma.tbl_usuario.findUnique({
        where: { id: parseInt(id) }
      });
      return usuario ? Usuario.fromPrisma(usuario) : null;
    } catch (error) {
      throw new Error(`Erro ao buscar usuário: ${error.message}`);
    }
  }

  async buscarTodos() {
    try {
      const usuarios = await prisma.tbl_usuario.findMany();
      return usuarios.map(usuario => Usuario.fromPrisma(usuario));
    } catch (error) {
      throw new Error(`Erro ao buscar usuários: ${error.message}`);
    }
  }

  async atualizar(id, usuario) {
    try {
      const usuarioAtualizado = await prisma.tbl_usuario.update({
        where: { id: parseInt(id) },
        data: usuario.toPrisma()
      });
      return Usuario.fromPrisma(usuarioAtualizado);
    } catch (error) {
      throw new Error(`Erro ao atualizar usuário: ${error.message}`);
    }
  }

  async deletar(id) {
    try {
      await prisma.tbl_usuario.delete({
        where: { id: parseInt(id) }
      });
      return true;
    } catch (error) {
      throw new Error(`Erro ao deletar usuário: ${error.message}`);
    }
  }

  async buscarPorEmail(email) {
    try {
      const usuario = await prisma.tbl_usuario.findFirst({
        where: { email: email }
      });
      return usuario ? Usuario.fromPrisma(usuario) : null;
    } catch (error) {
      throw new Error(`Erro ao buscar usuário por email: ${error.message}`);
    }
  }
}

module.exports = UsuarioDAO;

const UsuarioDAO = require('../dao/UsuarioDAO');
const Usuario = require('../models/Usuario');

class UsuarioController {
  constructor() {
    this.usuarioDAO = new UsuarioDAO();
  }

  async criar(req, res) {
    try {
      const { nome, email, senha } = req.body;
      
      if (!nome || !email || !senha) {
        return res.status(400).json({ 
          erro: 'Nome, email e senha são obrigatórios' 
        });
      }

      const usuarioExistente = await this.usuarioDAO.buscarPorEmail(email);
      if (usuarioExistente) {
        return res.status(400).json({ 
          erro: 'Usuário com este email já existe' 
        });
      }

      const usuario = new Usuario(null, nome, email, senha);
      const novoUsuario = await this.usuarioDAO.criar(usuario);
      
      res.status(201).json(novoUsuario);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }

  async buscarTodos(req, res) {
    try {
      const usuarios = await this.usuarioDAO.buscarTodos();
      res.json(usuarios);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }

  async buscarPorId(req, res) {
    try {
      const { id } = req.params;
      const usuario = await this.usuarioDAO.buscarPorId(id);
      
      if (!usuario) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
      }
      
      res.json(usuario);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }

  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { nome, email, senha } = req.body;
      
      const usuarioExistente = await this.usuarioDAO.buscarPorId(id);
      if (!usuarioExistente) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
      }

      const usuario = new Usuario(parseInt(id), nome, email, senha);
      const usuarioAtualizado = await this.usuarioDAO.atualizar(id, usuario);
      
      res.json(usuarioAtualizado);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }

  async deletar(req, res) {
    try {
      const { id } = req.params;
      
      const usuarioExistente = await this.usuarioDAO.buscarPorId(id);
      if (!usuarioExistente) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
      }

      await this.usuarioDAO.deletar(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }
}

module.exports = UsuarioController;

const MovimentacaoDAO = require('../dao/MovimentacaoDAO');
const Movimentacao = require('../models/Movimentacao');

class MovimentacaoController {
  constructor() {
    this.movimentacaoDAO = new MovimentacaoDAO();
  }

  async criar(req, res) {
    try {
      const { id_movimentacao, id_usuario, quantidade, data_movimentacao, id_livro } = req.body;
      
      if (!id_movimentacao || !id_usuario || quantidade === undefined || !data_movimentacao || !id_livro) {
        return res.status(400).json({ 
          erro: 'Todos os campos são obrigatórios: id_movimentacao, id_usuario, quantidade, data_movimentacao, id_livro' 
        });
      }

      const movimentacao = new Movimentacao(
        null, 
        parseInt(id_movimentacao), 
        parseInt(id_usuario), 
        parseInt(quantidade), 
        new Date(data_movimentacao), 
        parseInt(id_livro)
      );
      const novaMovimentacao = await this.movimentacaoDAO.criar(movimentacao);
      
      res.status(201).json(novaMovimentacao);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }

  async buscarTodos(req, res) {
    try {
      const movimentacoes = await this.movimentacaoDAO.buscarTodos();
      res.json(movimentacoes);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }

  async buscarPorId(req, res) {
    try {
      const { id } = req.params;
      const movimentacao = await this.movimentacaoDAO.buscarPorId(id);
      
      if (!movimentacao) {
        return res.status(404).json({ erro: 'Movimentação não encontrada' });
      }
      
      res.json(movimentacao);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }

  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { id_movimentacao, id_usuario, quantidade, data_movimentacao, id_livro } = req.body;
      
      const movimentacaoExistente = await this.movimentacaoDAO.buscarPorId(id);
      if (!movimentacaoExistente) {
        return res.status(404).json({ erro: 'Movimentação não encontrada' });
      }

      const movimentacao = new Movimentacao(
        parseInt(id), 
        parseInt(id_movimentacao), 
        parseInt(id_usuario), 
        parseInt(quantidade), 
        new Date(data_movimentacao), 
        parseInt(id_livro)
      );
      const movimentacaoAtualizada = await this.movimentacaoDAO.atualizar(id, movimentacao);
      
      res.json(movimentacaoAtualizada);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }

  async deletar(req, res) {
    try {
      const { id } = req.params;
      
      const movimentacaoExistente = await this.movimentacaoDAO.buscarPorId(id);
      if (!movimentacaoExistente) {
        return res.status(404).json({ erro: 'Movimentação não encontrada' });
      }

      await this.movimentacaoDAO.deletar(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }

  async buscarPorUsuario(req, res) {
    try {
      const { idUsuario } = req.params;
      const movimentacoes = await this.movimentacaoDAO.buscarPorUsuario(idUsuario);
      res.json(movimentacoes);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }

  async buscarPorLivro(req, res) {
    try {
      const { idLivro } = req.params;
      const movimentacoes = await this.movimentacaoDAO.buscarPorLivro(idLivro);
      res.json(movimentacoes);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }

  async buscarPorPeriodo(req, res) {
    try {
      const { dataInicio, dataFim } = req.query;
      
      if (!dataInicio || !dataFim) {
        return res.status(400).json({ 
          erro: 'Data de início e fim são obrigatórias' 
        });
      }

      const movimentacoes = await this.movimentacaoDAO.buscarPorPeriodo(dataInicio, dataFim);
      res.json(movimentacoes);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }
}

module.exports = MovimentacaoController;

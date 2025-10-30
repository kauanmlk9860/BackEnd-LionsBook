const TipoMovimentacaoDAO = require('../dao/TipoMovimentacaoDAO');
const TipoMovimentacao = require('../models/TipoMovimentacao');

class TipoMovimentacaoController {
  constructor() {
    this.tipoMovimentacaoDAO = new TipoMovimentacaoDAO();
  }

  async criar(req, res) {
    try {
      const { tipo } = req.body;
      
      if (!tipo) {
        return res.status(400).json({ 
          erro: 'Tipo é obrigatório' 
        });
      }

      const tipoExistente = await this.tipoMovimentacaoDAO.buscarPorTipo(tipo);
      if (tipoExistente) {
        return res.status(400).json({ 
          erro: 'Tipo de movimentação já existe' 
        });
      }

      const tipoMovimentacao = new TipoMovimentacao(null, tipo);
      const novoTipoMovimentacao = await this.tipoMovimentacaoDAO.criar(tipoMovimentacao);
      
      res.status(201).json(novoTipoMovimentacao);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }

  async buscarTodos(req, res) {
    try {
      const tiposMovimentacao = await this.tipoMovimentacaoDAO.buscarTodos();
      res.json(tiposMovimentacao);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }

  async buscarPorId(req, res) {
    try {
      const { id } = req.params;
      const tipoMovimentacao = await this.tipoMovimentacaoDAO.buscarPorId(id);
      
      if (!tipoMovimentacao) {
        return res.status(404).json({ erro: 'Tipo de movimentação não encontrado' });
      }
      
      res.json(tipoMovimentacao);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }

  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { tipo } = req.body;
      
      const tipoExistente = await this.tipoMovimentacaoDAO.buscarPorId(id);
      if (!tipoExistente) {
        return res.status(404).json({ erro: 'Tipo de movimentação não encontrado' });
      }

      const tipoMovimentacao = new TipoMovimentacao(parseInt(id), tipo);
      const tipoAtualizado = await this.tipoMovimentacaoDAO.atualizar(id, tipoMovimentacao);
      
      res.json(tipoAtualizado);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }

  async deletar(req, res) {
    try {
      const { id } = req.params;
      
      const tipoExistente = await this.tipoMovimentacaoDAO.buscarPorId(id);
      if (!tipoExistente) {
        return res.status(404).json({ erro: 'Tipo de movimentação não encontrado' });
      }

      await this.tipoMovimentacaoDAO.deletar(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }
}

module.exports = TipoMovimentacaoController;

const LivroDAO = require('../dao/LivroDAO');
const Livro = require('../models/Livro');

class LivroController {
  constructor() {
    this.livroDAO = new LivroDAO();
  }

  async criar(req, res) {
    try {
      const { titulo, data_publicacao, quantidade, isbn } = req.body;
      
      if (!titulo || !data_publicacao || quantidade === undefined || !isbn) {
        return res.status(400).json({ 
          erro: 'Título, data de publicação, quantidade e ISBN são obrigatórios' 
        });
      }

      const livroExistente = await this.livroDAO.buscarPorIsbn(isbn);
      if (livroExistente) {
        return res.status(400).json({ 
          erro: 'Livro com este ISBN já existe' 
        });
      }

      const livro = new Livro(null, titulo, new Date(data_publicacao), parseInt(quantidade), isbn);
      const novoLivro = await this.livroDAO.criar(livro);
      
      res.status(201).json(novoLivro);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }

  async buscarTodos(req, res) {
    try {
      const livros = await this.livroDAO.buscarTodos();
      res.json(livros);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }

  async buscarPorId(req, res) {
    try {
      const { id } = req.params;
      const livro = await this.livroDAO.buscarPorId(id);
      
      if (!livro) {
        return res.status(404).json({ erro: 'Livro não encontrado' });
      }
      
      res.json(livro);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }

  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { titulo, data_publicacao, quantidade, isbn } = req.body;
      
      const livroExistente = await this.livroDAO.buscarPorId(id);
      if (!livroExistente) {
        return res.status(404).json({ erro: 'Livro não encontrado' });
      }

      const livro = new Livro(
        parseInt(id), 
        titulo, 
        new Date(data_publicacao), 
        parseInt(quantidade), 
        isbn
      );
      const livroAtualizado = await this.livroDAO.atualizar(id, livro);
      
      res.json(livroAtualizado);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }

  async deletar(req, res) {
    try {
      const { id } = req.params;
      
      const livroExistente = await this.livroDAO.buscarPorId(id);
      if (!livroExistente) {
        return res.status(404).json({ erro: 'Livro não encontrado' });
      }

      await this.livroDAO.deletar(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }

  async buscarPorTitulo(req, res) {
    try {
      const { titulo } = req.query;
      
      if (!titulo) {
        return res.status(400).json({ erro: 'Título é obrigatório para busca' });
      }

      const livros = await this.livroDAO.buscarPorTitulo(titulo);
      res.json(livros);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }
}

module.exports = LivroController;

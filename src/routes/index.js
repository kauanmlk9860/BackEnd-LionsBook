const express = require('express');
const usuarioRoutes = require('./usuarioRoutes');
const livroRoutes = require('./livroRoutes');
const tipoMovimentacaoRoutes = require('./tipoMovimentacaoRoutes');
const movimentacaoRoutes = require('./movimentacaoRoutes');

const router = express.Router();

router.use('/usuarios', usuarioRoutes);
router.use('/livros', livroRoutes);
router.use('/tipos-movimentacao', tipoMovimentacaoRoutes);
router.use('/movimentacoes', movimentacaoRoutes);

router.get('/', (req, res) => {
  res.json({
    message: 'API da Biblioteca - Sistema de Gerenciamento',
    version: '1.0.0',
    endpoints: {
      usuarios: '/api/usuarios',
      livros: '/api/livros',
      tiposMovimentacao: '/api/tipos-movimentacao',
      movimentacoes: '/api/movimentacoes'
    }
  });
});

module.exports = router;

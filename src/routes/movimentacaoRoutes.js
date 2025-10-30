const express = require('express');
const MovimentacaoController = require('../controllers/MovimentacaoController');

const router = express.Router();
const movimentacaoController = new MovimentacaoController();

router.post('/', (req, res) => movimentacaoController.criar(req, res));
router.get('/', (req, res) => movimentacaoController.buscarTodos(req, res));
router.get('/periodo', (req, res) => movimentacaoController.buscarPorPeriodo(req, res));
router.get('/usuario/:idUsuario', (req, res) => movimentacaoController.buscarPorUsuario(req, res));
router.get('/livro/:idLivro', (req, res) => movimentacaoController.buscarPorLivro(req, res));
router.get('/:id', (req, res) => movimentacaoController.buscarPorId(req, res));
router.put('/:id', (req, res) => movimentacaoController.atualizar(req, res));
router.delete('/:id', (req, res) => movimentacaoController.deletar(req, res));

module.exports = router;

const express = require('express');
const TipoMovimentacaoController = require('../controllers/TipoMovimentacaoController');

const router = express.Router();
const tipoMovimentacaoController = new TipoMovimentacaoController();

router.post('/', (req, res) => tipoMovimentacaoController.criar(req, res));
router.get('/', (req, res) => tipoMovimentacaoController.buscarTodos(req, res));
router.get('/:id', (req, res) => tipoMovimentacaoController.buscarPorId(req, res));
router.put('/:id', (req, res) => tipoMovimentacaoController.atualizar(req, res));
router.delete('/:id', (req, res) => tipoMovimentacaoController.deletar(req, res));

module.exports = router;

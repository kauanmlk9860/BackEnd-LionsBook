const express = require('express');
const LivroController = require('../controllers/LivroController');

const router = express.Router();
const livroController = new LivroController();

router.post('/', (req, res) => livroController.criar(req, res));
router.get('/', (req, res) => livroController.buscarTodos(req, res));
router.get('/buscar', (req, res) => livroController.buscarPorTitulo(req, res));
router.get('/:id', (req, res) => livroController.buscarPorId(req, res));
router.put('/:id', (req, res) => livroController.atualizar(req, res));
router.delete('/:id', (req, res) => livroController.deletar(req, res));

module.exports = router;

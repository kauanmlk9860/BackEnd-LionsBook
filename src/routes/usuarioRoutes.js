const express = require('express');
const UsuarioController = require('../controllers/UsuarioController');

const router = express.Router();
const usuarioController = new UsuarioController();

router.post('/', (req, res) => usuarioController.criar(req, res));
router.get('/', (req, res) => usuarioController.buscarTodos(req, res));
router.get('/:id', (req, res) => usuarioController.buscarPorId(req, res));
router.put('/:id', (req, res) => usuarioController.atualizar(req, res));
router.delete('/:id', (req, res) => usuarioController.deletar(req, res));

module.exports = router;

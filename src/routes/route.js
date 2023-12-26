const express = require('express');
const router = express.Router();
const profissionalController = require('../controllers/profissionalControllers')
const pacienteController = require('../controllers/pacienteControllers')


// Rota para busca
router.get('/profissionais', profissionalController.obterProfissional);
router.get('/pacientes', pacienteController.obterPaciente);
router.get('/pacientes/:profissionalId', pacienteController.obterPacientePorProfissional);


//Rota para criar
router.post('/criarProfissional', profissionalController.criarProfissional);
router.post('/criarPaciente', pacienteController.criarPaciente);

//Rota para atualizar


//Rota para excluir

//Rota para inativar

module.exports = router;
const express = require('express');
const router = express.Router();
const profissionalController = require('../controllers/profissionalControllers')
const pacienteController = require('../controllers/pacienteControllers')
const agendamentoController = require('../controllers/agendamentoControllers')

// Rota para busca de profissional
router.get('/profissionais', profissionalController.obterProfissional);

//Rota para busca de paciente
router.get('/pacientes', pacienteController.obterPaciente);
router.get('/pacientes/:profissionalId', pacienteController.obterPacientePorProfissional);

//Rota para busca de agendamento
router.get('/agendamento', agendamentoController.obterAgendamento);
router.get('/agendamentoProfissional/:profissionalId', agendamentoController.obterAgendamentoProfissional);
router.get('/agendamentoPaciente/:pacienteId', agendamentoController.obterAgendamentoPaciente);
router.get('/agendamento/count', agendamentoController.contarDocumentos);


//Rota para criar
router.post('/criarProfissional', profissionalController.criarProfissional);
router.post('/criarPaciente', pacienteController.criarPaciente);
router.post('/criarAgendamento',agendamentoController.criarAgendamento);
//Rota para atualizar


//Rota para excluir

//Rota para inativar

module.exports = router;
const express = require('express');
const router = express.Router();
const profissionalController = require('../controllers/profissionalControllers')
const pacienteController = require('../controllers/pacienteControllers')
const agendamentoController = require('../controllers/agendamentoControllers')
const prontuarioController = require('../controllers/prontuarioControllers')

// Rota para busca de profissional
router.get('/profissional', profissionalController.obterProfissional);
router.get('/profissional/:profissionalId', profissionalController.obterProfissionalId)
router.get('/profissionalCount', profissionalController.contarDocumentoProfissional);

//Rota para busca de paciente
router.get('/pacientes', pacienteController.obterPaciente);
router.get('/pacientes/:profissionalId', pacienteController.obterPacientePorProfissional);
router.get('/pacientesCount', pacienteController.contarDocumentoPaciente)

//Rota para busca de agendamento
router.get('/agendamento', agendamentoController.obterAgendamento);
router.get('/agendamentoProfissional/:profissionalId', agendamentoController.obterAgendamentoProfissional);
router.get('/agendamentoPaciente/:pacienteId', agendamentoController.obterAgendamentoPaciente);
router.get('/agendamentoCount', agendamentoController.contarDocumentoAgendamento);

//Rota para busca de prontuario
router.get('/prontuario', prontuarioController.obterProntuario);
router.get('/prontuarioProfissional/:profissionalId', prontuarioController.obterProntuarioProfissional);
router.get('/prontuarioPaciente/:pacienteId',prontuarioController.obterProntuarioPaciente);
router.get('/prontuarioCount',prontuarioController.contarDocumentoProntuario);

//Rota para criar
router.post('/criarProfissional', profissionalController.criarProfissional);
router.post('/criarPaciente', pacienteController.criarPaciente);
router.post('/criarAgendamento',agendamentoController.criarAgendamento);
router.post('/criarProntuario',prontuarioController.criarProntuario);

//Rota para atualizar


//Rota para excluir

//Rota para inativar

module.exports = router;
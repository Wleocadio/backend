const express = require('express');
const router = express.Router();
const profissionalController = require('../controllers/profissionalControllers')
const pacienteController = require('../controllers/pacienteControllers')
const agendamentoController = require('../controllers/agendamentoControllers')
const prontuarioController = require('../controllers/prontuarioControllers')
const usuarioController = require('../auth/usuarioController')
const verificaToken = require('../functions/validaToken')


// Rota para busca de profissional
router.get('/profissional', verificaToken, (req, res) => {
    profissionalController.obterProfissional(req, res)
}); 
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
router.post('/registrar/:profissionalId', usuarioController.criarAcesso);
//Rota para atualizar
router.patch('/atualizarProfissional/:profissionalId', profissionalController.atualizarProfissional);
router.patch('/atualizarAcesso/:profissionalId',usuarioController.atualizarAcesso);

//Rota Login
router.post('/auth/login', usuarioController.login)

//Rota para excluir

//Rota para inativar

module.exports = router;
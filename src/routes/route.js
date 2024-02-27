const express = require('express');
const router = express.Router();
const profissionalController = require('../controllers/profissionalControllers')
const pacienteController = require('../controllers/pacienteControllers')
const agendamentoController = require('../controllers/agendamentoControllers')
const prontuarioController = require('../controllers/prontuarioControllers')
const usuarioController = require('../auth/usuarioController')
const validaToken = require('../middleware/validaToken')
const fotoPerfilController = require('../controllers/fotoPerfilController')
const esquecisenhaController = require('../controllers/envioControllers')
const notificacaoController = require('../controllers/notificacaoControllers')



const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


// verificaToken valida se o usuário está tem um token válido para fazer as requisições
// Rota para busca de profissional
/**
 * @swagger
 * /profissional:
 *   get:
 *     summary: Retorna uma lista de profissionais
 *     tags: [Profissional]
 *     responses:
 *       200:
 *         description: Lista de profissionais
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Profissional'
 */
router.get('/profissional', validaToken, (req, res) => {
    profissionalController.obterProfissional(req, res)
});
router.get('/profissional/:profissionalId', validaToken, (req, res) => {
    profissionalController.obterProfissionalId(req, res)
})
router.get('/profissionalCount', validaToken, (req, res) => {
    profissionalController.contarDocumentoProfissional(req, res)
});


//Rota para busca de paciente
router.get('/pacientes', validaToken, (req, res) => {
    pacienteController.obterPaciente(req, res)
});
router.get('/pacientes/:profissionalId', validaToken, (req, res) => {
    pacienteController.obterPacientePorProfissional(req, res)
});
router.get('/pacientesCount', validaToken, (req, res) => {
    pacienteController.contarDocumentoPaciente(req, res)
})

//Rota para busca de agendamento
router.get('/agendamento', validaToken, (req, res) => {
    agendamentoController.obterAgendamento(req, res)
});
router.get('/agendamentoProfissional/:profissionalId', validaToken, (req, res) => {
    agendamentoController.obterAgendamentoProfissional(req, res)
});
router.get('/agendamentoPaciente/:pacienteId', validaToken, (req, res) => {
    agendamentoController.obterAgendamentoPaciente(req, res)
});
router.get('/agendamentoCount', validaToken, (req, res) => {
    agendamentoController.contarDocumentoAgendamento(req, res)
});

//Rota para busca de prontuario
router.get('/prontuario', validaToken, (req, res) => {
    prontuarioController.obterProntuario(req, res)
});
router.get('/prontuarioProfissional/:profissionalId', validaToken, (req, res) => {
    prontuarioController.obterProntuarioProfissional(req, res)
});
router.get('/prontuarioPaciente/:pacienteId', validaToken, (req, res) => {
    prontuarioController.obterProntuarioPaciente(req, res)
});
router.get('/prontuarioCount', validaToken, (req, res) => {
    prontuarioController.contarDocumentoProntuario(req, res)
});
router.get('/fotoPerfil/:profissionalId', validaToken,
    fotoPerfilController.obterFotoPerfil)

router.get('/notificacao', validaToken,
    notificacaoController.obterNotificacao)//adicionar no swagger
router.get('/notificacaoProfissional/:profissionalId', validaToken, (req,res) =>{
    notificacaoController.obterNotificacaoProfissional(req,res)
})//adicionar no swagger

router.get('/dadosProfissionais', profissionalController.dadosPublicoProfissional);


//Rota para criar
router.post('/criarProfissional', profissionalController.criarProfissional);

router.post('/criarPaciente', validaToken, (req, res) => {
    pacienteController.criarPaciente(req, res)
});
router.post('/criarAgendamento', validaToken, (req, res) => {
    agendamentoController.criarAgendamento(req, res)
});
router.post('/criarProntuario', validaToken, (req, res) => {
    prontuarioController.criarProntuario(req, res)
});
/* utilizar quando já tiver um adm registrado no banco
router.post('/registrar/:profissionalId', validaToken, (req, res) => {
    usuarioController.criarAcesso(req, res)
});
*/
router.post('/registrar/:profissionalId', usuarioController.criarAcesso);
router.post('/fotoPerfil/:profissionalId', validaToken, upload.single('foto'),
    fotoPerfilController.criarFotoPerfil);




//Rota para atualizar
router.patch('/atualizarProfissional/:profissionalId', validaToken, (req, res) => {
    profissionalController.atualizarProfissional(req, res)
});
router.patch('/atualizarAcesso/:profissionalId', validaToken, (req, res) => {
    usuarioController.atualizarAcesso(req, res)
});
router.patch('/atualizarFotoPerfil/:profissionalId', validaToken, upload.single('foto'),
    fotoPerfilController.atualizarFotoPerfil
);
router.patch('/atualizarAgendamento/:agendamentoId', validaToken, (req, res) => {
    agendamentoController.atualizarAgendamento(req, res)

})
router.patch('/notificacaoStatus/:notificacaoId', validaToken, (req, res) =>{
    notificacaoController.atualizarNotificacaoProfissional(req, res)
})//adicionar no swagger

router.patch('/recuperarSenha', usuarioController.recuperarSenha)// adicionar no swagger

//Rota Login
router.post('/auth/signin', usuarioController.login)
router.post('/logoff/:profissionalId', validaToken,(req, res) =>{
    usuarioController.logoff(req, res) }) // adicionar no wagger

router.post('/esqueciSenha', esquecisenhaController.solicitarSenha)// adicionar no swagger

//Rota para excluir

//Rota para inativar


module.exports = router;
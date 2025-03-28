const axios = require('axios');
const limiter = require('../middleware/limitador')
const Profissional = require('../models/profissionalModel')
const Notificacao = require('../models/notificacaoModel')
const Paciente = require('../models/pacienteModel')


async function salvarNotificacao(nomeProfissional, nomePaciente, whatsAppPaciente, data, sessionId) {

    const profissional = await Profissional.findOne({nomeCompleto: nomeProfissional})
    const paciente = await Paciente.findOne({nomeCompleto: nomePaciente})
    const profissionalId = profissional._id
    const pacienteId = paciente._id
  
    try {
     
        const novaNotificacao = new Notificacao({
            
            profissionalId: profissionalId, // Referência ao Profissional.,
            pacienteId: pacienteId, // Referência ao Profissional.
            dataHoraConsulta: data,
            statusNotificacao: 'Lida'
        });
        await novaNotificacao.save();
        console.log('Notificação Salva')
      
    } catch (error) {
        console.error('Erro ao salvar notificação:', error);
        //res.status(500).json({ Mensagem: 'Erro ao salvar notificação' });
    }

}

    
module.exports = salvarNotificacao;

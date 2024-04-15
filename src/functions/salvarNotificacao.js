const axios = require('axios');
const limiter = require('../middleware/limitador')
const Profissional = require('../models/profissionalModel')
const Notificacao = require('../models/notificacaoModel')
const Paciente = require('../models/pacienteModel')


async function salvarNotificacao(nomeProfissional, nomePaciente, whatsAppPaciente, data, sessionId) {

    const profissional = await Profissional.findOne({ nomeCompleto: nomeProfissional })
    const paciente = await Paciente.findOne({ nomeCompleto: nomePaciente })
    const profissionalId = profissional._id
    const pacienteId = paciente._id
    /*
      if (condition) {
          opção no front habilitada para receber email.
          validar se vai receber por email
      }
  
  */
      console.log(data)
      console.log(pacienteId)


        const verificaDataHora = await Notificacao.findOne({
            dataHoraConsulta: data,
            pacienteId: pacienteId
        });
        if (verificaDataHora) {
            console.log('Essa notificação já foi cadastrada.')
            return { sucesso: false, mensagem: 'Essa notificação já foi cadastrada.' };
            
            //return json({ Mensagem: 'Essa notificação já foi cadastrada.' })
        }



    try {

        const novaNotificacao = new Notificacao({

            profissionalId: profissionalId, // Referência ao Profissional.,
            profissional:profissional.nomeCompleto,
            pacienteId: pacienteId, // Referência ao Profissional.
            paciente:paciente.nomeCompleto,
            tipo: 'Consulta Agendada',
            dataHoraConsulta: data,
            statusNotificacao: 'Entregue'
        });



        await novaNotificacao.save();
        console.log('Notificação Salva')

    } catch (error) {
        console.error('Erro ao salvar notificação:', error);
        //res.status(500).json({ Mensagem: 'Erro ao salvar notificação' });
    }

}


module.exports = salvarNotificacao;

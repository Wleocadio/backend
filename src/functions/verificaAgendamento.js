const Agendamento = require('../models/agendamentoModel'); // Modelo Mongoose para agendamentos
const Profissional = require('../models/profissionalModel')
const Paciente = require('../models/pacienteModel')
const enviarAlertasAgendamento = require('./enviaAlertaAgendamento')
const salvarNotificacao = require('./salvarNotificacao')
// Importe suas outras dependências e funções aqui

// Função que verifica os agendamentos do dia seguinte e envia alertas
async function verificarAgendamentosESendAlerts(sessionId) {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0); // Define o início do dia para a meia-noite de hoje
    const amanha = new Date(hoje);
    amanha.setDate(hoje.getDate() + 1); // Define o início do dia para a meia-noite do próximo dia
    //console.log('antes do try')
    try {
        const agendamentosHoje = await Agendamento.find({

            dataHora: {
                $gte: hoje,
                $lt: amanha
            },
            statusConsulta: "Agendado"
        }); 

        if(agendamentosHoje == ""){
            console.log('Nenhuma consulta encontrada.')
           
        }
  
        console.log(hoje)
        console.log('busca do agendamento')
        console.log(agendamentosHoje)
     
        for (const agendamento of agendamentosHoje) {
            let nomeProfissional, whatsAppProfissional, nomePaciente, whatsAppPaciente;
            // Aqui, use a função que você criou para enviar os alertas
            // Por exemplo, substitua com a chamada da sua função de envio de alerta
            
            //busca o profissional que consta no agendamento
            const profissional = await Profissional.findById(agendamento.profissionalId);
            if (profissional) {
                nomeProfissional = profissional.nomeCompleto;
                whatsAppProfissional = profissional.Contato.whatsApp; // Ajuste conforme a estrutura do seu modelo
              //  console.log(nomeProfissional, whatsAppProfissional)
                
            }
            //Busca o paciente que costa no agendamento
            const paciente = await Paciente.findById(agendamento.pacienteId)
            if (paciente) {
                 nomePaciente = paciente.nomeCompleto;
                 whatsAppPaciente = paciente.whatsApp;
              //  console.log(nomePaciente, whatsAppPaciente)
                
            }

            //formata a data para a do Brasil
            const dataBrasil = new Date(agendamento.dataHora).toLocaleString('pt-BR', {
                timeZone: 'America/Sao_Paulo',
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
               
            });
            //Formata o horario para a do Brasil
            const horaBrasil = new Date(agendamento.dataHora).toLocaleString('pt-BR', {
                timeZone: 'America/Sao_Paulo',
                hour: '2-digit',
                minute: '2-digit'
               
            });

            if (sessionId == "notificacao") {
                const data = agendamento.dataHora
                await salvarNotificacao(nomeProfissional, nomePaciente, whatsAppPaciente, data, sessionId);
                
            }else{
                console.log(nomeProfissional, whatsAppProfissional, nomePaciente, whatsAppPaciente, dataBrasil, horaBrasil, sessionId)
                await enviarAlertasAgendamento(nomeProfissional, whatsAppProfissional, nomePaciente, whatsAppPaciente, dataBrasil, horaBrasil, sessionId);
            
            }

            }
    } catch (error) {
        console.error('Erro ao verificar agendamentos:', error);
    }
}

module.exports = verificarAgendamentosESendAlerts;

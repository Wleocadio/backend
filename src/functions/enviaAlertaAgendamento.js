const axios = require('axios');
const limiter = require('../middleware/limitador')


/*1 function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}*/

//Valida se o Numero de Telefone está registrado no Whatsapp
async function isRegisteredUser(userPhone,sessionId ) {
    const url = `http://localhost:4000/client/isRegisteredUser/${sessionId}`;
    try {
        const response = await axios.post(url, { number: userPhone });
        console.log('Usuário cadastrado')
        return response.data.success && response.data.result;
        
    } catch (error) {
        console.error('Erro ao verificar se o usuário está registrado:', error);
        return false;
    }
}


async function enviarMensagem(url, chatId, mensagem) {
    return axios.post(url,{
        chatId: chatId,
        contentType: "string",
        content: mensagem
    });
}


async function enviarAlertasAgendamento(nomeProfissional, whatsAppProfissional, nomePaciente, whatsAppPaciente, dataBrasil, horaBrasil, sessionId) {

    try {

        //console.log('teste enviar'+ nomeProfissional, whatsAppProfissional, nomePaciente, whatsAppPaciente, dataBrasil, horaBrasil, sessionId)

        const isPacienteRegistered = await isRegisteredUser(`55${whatsAppPaciente}`,sessionId);
        if (isPacienteRegistered) {
            const url = `http://localhost:4000/client/sendMessage/${sessionId}`;
            const mensagemParaPaciente = `Olá ${nomePaciente}! Espero que se encontre bem! Você tem uma consulta agendada com ${nomeProfissional} hoje, ${dataBrasil}, às ${horaBrasil}.`;
            console.log(`Olá, ${nomePaciente}! Espero que se encontre bem! Você tem uma consulta agendada com ${nomeProfissional} hoje ${dataBrasil} às ${horaBrasil}.`);

            //Envia a mensagem para o paciente
            await limiter.schedule(() => enviarMensagem(url, `55${whatsAppPaciente}@c.us`, mensagemParaPaciente));
            console.log('Alerta de agendamento enviado para o paciente');
        } else {
            console.log(`O paciente com o número 55${whatsAppPaciente} não está registrado no WhatsApp.`);
        }


       // const url = `http://localhost:4000/client/sendMessage/${sessionId}`;
        //const dataFormatada = new Date(agendamento.dataHora).toLocaleString();

        //const mensagemParaProfissional = `Olá ${nomeProfissional}, tudo bem? Você tem uma consulta agendada com o paciente ${nomePaciente} hoje ${dataBrasil} as ${horaBrasil}.`;
       // const mensagemParaPaciente = `Olá ${nomePaciente}, tudo bem? Você tem uma consulta agendada com ${nomeProfissional} hoje ${dataBrasil} as ${horaBrasil}.`;
       // console.log(`Olá ${nomePaciente}, tudo bem? Você tem uma consulta agendada com ${nomeProfissional} hoje ${dataBrasil} as ${horaBrasil}.`)
        //Envia a mensagem para o paciente
       /// await limiter.schedule(()=> enviarMensagem(url, `55${whatsAppPaciente}@c.us`, mensagemParaPaciente))
        //console.log(url, `55${whatsAppPaciente}@c.us`, mensagemParaPaciente)
        //2  await sleep(7000); // Delay de 15 segundos

        //Envia a mensagem para o profissional --> se for utilizar precisa descometar o sleep 1,2 ,3
        //await limiter.schedule(()=> enviarMensagem(url, `55${whatsAppProfissional}@c.us`, mensagemParaProfissional))

        //3  await sleep(7000); // Delay de 15 segundos

        // Enviar mensagem para o profissional
        /*  await axios.post(url, {
              chatId: `55${whatsAppProfissional}@c.us`,
              contentType: "string",
              content: mensagemParaProfissional
          });
        */
       // Aguarda um intervalo antes de enviar a próxima mensagem
     //  await sleep(15000); // Delay de 15 segundos
      
     // Enviar mensagem para o paciente
/*        await axios.post(url, {
            chatId: `55${whatsAppPaciente}@c.us`,
            contentType: "string",
            content: mensagemParaPaciente
        });
*/
        console.log('Alertas de agendamento enviados');
    } catch (error) {
        console.error('Erro ao enviar alertas de agendamento:', error);
    }
}

module.exports = enviarAlertasAgendamento;

// Exemplo de uso

//enviarAlertasAgendamento(nomeProfissional, whatsAppProfissional, nomePaciente, whatsAppPaciente, dataBrasil, horaBrasil, sessionId);
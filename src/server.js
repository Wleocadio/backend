const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const MONGODB_URL = 'mongodb://localhost:27017/psiconsultas';
const routes = require('./routes/route')
require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument  = require('../swagger.json');
const cron = require('node-cron');
const verificarAgendamentosESendAlerts = require('./functions/verificaAgendamento')
mongoose.connect(MONGODB_URL);



const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro de conexão com o MongoDB'));
db.once('open', () =>{
    console.log('Conectado ao MongoDB!');
})


app.use(express.json());

// Agendar tarefa para executar diariamente em um horário específico (por exemplo, à meia-noite)
const sessionId = "apiwhatsapp";
const notificacao = "notificacao"
cron.schedule('0 9 * * *', () => {
    console.log('Verificando agendamentos para hoje...');
    //verificarAgendamentosESendAlerts(sessionId); //- desabilitado a verificação da agenda
    verificarAgendamentosESendAlerts(notificacao); // verifica chamada para verificar agendamento
    //enviarNotificacaoEmail();
});
//Rotas

app.use('/api', routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(PORT, ()=>{
    console.log(`Servidor rodando na porta https://localhost:${PORT}`);
})

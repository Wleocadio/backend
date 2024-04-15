const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
//const MONGODB_URL = 'mongodb://localhost:27017/psiconsultas'; usar para local
//const MONGODB_URL = 'mongodb+srv://wleocadio:CXv0o6X1LVmN3rxQ@psiconsultas.3nugsl4.mongodb.net/Psiconsultas?retryWrites=true&w=majority';
const MONGODB_URL = process.env.MONGODB_URL
const { MongoClient, ServerApiVersion } = require('mongodb');

const routes = require('./routes/route')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument  = require('../swagger.json');
const cron = require('node-cron');
const verificarAgendamentosESendAlerts = require('./functions/verificaAgendamento')
//const dbUser = process.env.DB_USER;
//const dbPass = process.env.DB_PASS;


mongoose.connect(MONGODB_URL);


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro de conexão com o MongoDB'));
db.once('open', () =>{
    console.log('Conectado ao MongoDB!');
})

/*
const uri = 'mongodb+srv://wleocadio:CXv0o6X1LVmN3rxQ@psiconsultas.3nugsl4.mongodb.net/Psiconsultas?retryWrites=true&w=majority';
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
    serverSelectionTimeoutMS: 5000, // Tempo limite para seleção do servidor
    socketTimeoutMS: 45000, // Tempo limite para operações no socket
    
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    console.log(dbUser, dbPass)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("MongoDB conectado com sucesso!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
*/
const corsOptions = {
  methods: ['GET', 'POST', 'PATCH', 'DELETE'], // Adicione todos os métodos que você deseja permitir
  origin: '*', // Substitua '*' pelo domínio do cliente se desejar restringir
  optionsSuccessStatus: 200 // para navegadores legados que usam XMLHttpRequest para CORS
};

app.use(cors(corsOptions));
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
app.listen({
    host:'0.0.0.0',
    port:PORT
    /*PORT, ()=>{
    console.log(`Servidor rodando na porta https://localhost:${PORT}`);*/
})

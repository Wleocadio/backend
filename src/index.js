const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const MONGODB_URL = 'mongodb://localhost:27017/psiconsultas';
const routes = require('./routes/route')
require('dotenv').config();

mongoose.connect(MONGODB_URL);


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro de conexão com o MongoDB'));
db.once('open', () =>{
    console.log('Conectado ao MongoDB!');
})


app.use(express.json());

//Rotas

app.use('/api', routes);

app.listen(PORT, ()=>{
    console.log(`Servidor rodando na porta https://localhost:${PORT}`);
})

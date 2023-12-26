const mongoose = require('mongoose');

const enderecoSchema = new mongoose.Schema({

    cep: { type: String },
    rua: { type: String },
    numeroResidencia: { type: String },
    complemento: { type: String },
    bairro: { type: String },
    cidade: { type: String },
    estado: { type: String }
})


//const Endereco = mongoose.model('EnderecoSchema', enderecoSchema);

module.exports = enderecoSchema;
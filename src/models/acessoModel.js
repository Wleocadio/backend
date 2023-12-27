const mongoose = require('mongoose');

const acessoSchema = new mongoose.Schema({

    usuario: { type: String },
    senha: { type: String },
    bloqueio: { type: Boolean },
    plano: { type: String },


})

module.exports = acessoSchema;
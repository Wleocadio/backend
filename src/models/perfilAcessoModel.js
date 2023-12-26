const mongoose = require('mongoose');

const perfilAcessoSchema = new mongoose.Schema({

    // Pensei em criar 4 tipos de permissão
    // Administrador, ProfissionalComum, Divulgador e Paciente.
    niveisAcesso: {
        tipoAcesso: { type: String },
        nomeNivel: { type: String },
        permissao: { type: String }
    }
})


const PerfilAcesso = mongoose.model('PerfilAcesso', perfilAcessoSchema);

module.exports = PerfilAcesso;
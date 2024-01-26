const mongoose = require('mongoose');
const enderecoSchema = require ('./enderecoModel')
const acessoSchema = require('./acessoModel')

const horarioAtendimento = new mongoose.Schema({
    data: { type: String },
    horaInicio: { type: String },
    horaFim: { type: String },
    status: { type: String, }

})

const perfilProfissional = new mongoose.Schema({

})


const profissionalSchema = new mongoose.Schema({
    nomeCompleto: { type: String, required: true },
    documento: {
        tipo: { type: String, required: true },
        numeroDocumento: { type: String, required: true, unique: true }
    },
    registroProfissional: {
        tipo: { type: String, required: true },
        numeroRegistro: { type: String, required: true }
    },
    
    //acesso: acessoSchema,
    perfilAcessoId: { type: mongoose.Schema.Types.ObjectId, ref: 'PerfilAcesso' }, // Referência ao Perfil de acesso.
    descricao: {
        descricaoEspecialidade: { type: String },
        descricaoAtendimento: { type: String },
        descricaoPerfil: { type: String },
    },
    Contato: {
        telefone: { type: Number, required: true },
        whatsApp: { type: Number },
        email: { type: String, required: true, unique: true }
    },
    endereco: enderecoSchema, // Schema de endereço
    especialidade: [{ type: String }],
    experiencia: { type: String },
    formacao: [{ type: String }],
    descricaoPessoal: { type: String },
    politicaRemarcacao: { type: String },
    horarioAtendimento: [horarioAtendimento],
    valorConsulta: { type: Number },
    tempoSessao: { type: Number },
    redesSociais: [{
        tipoRedesSociais: { type: String },
        linkRedesSociais: { type: String }
    }],
    avaliacoes: [{ type: String }],
    quantidadesAtendimentos: { type: Number },



});

const Profissional = mongoose.model('Profissional', profissionalSchema);

module.exports = Profissional
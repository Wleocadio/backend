const mongoose = require('mongoose');
const enderecoSchema = require ('./enderecoModel')
const acessoSchema = require('./acessoModel')


const prontuarioPaciente = new mongoose.Schema({
    avaliacaoDemanda: { type: String }, //  Avaliacao de Demanda e definição de objetivos do trabalho
    progresso: { type: String },        //  Registro da evolução do trabalho, de modo a permitir o conhecimento do mesmo e seu acompanhamento, bem como os procedimentos técnico-científicos adotados
    encaminhamento: { type: String },   //  Registro de Encaminhamento ou Encerramento
    informacoesGeral: { type: String },  //  Informações Gerais
    status: { type: String }             // Para saber se o Paciente já teve alta
})

const pacienteSchema = new mongoose.Schema({
    nomeCompleto: { type: String, required: true },
    documento: {
        tipoDocumento: { type: String },
        numeroDocumento: { type: String, required: true, unique: true },
    },
    dataNascimento: { type: Date },
    sexo: { type: String },
    endereco: enderecoSchema, // Schema de endereço
    //acesso: acessoSchema, //Schema de acesso
    email: { type: String, unique: true, lowercase: true },
    contato: { type: Number },
    whatsApp: { type: Number },
    contatoEmergencia: { type: Number },
    prontuario: [prontuarioPaciente],
    profissionalId:{type: mongoose.Schema.Types.ObjectId, ref: 'Profissional'}, // Referência ao Profissional.
    perfilAcessoId:{type: mongoose.Schema.Types.ObjectId, ref: 'PerfilAcesso'} // Referência ao Perfil de acesso.
})

const Paciente = mongoose.model('Paciente', pacienteSchema);

module.exports = Paciente;
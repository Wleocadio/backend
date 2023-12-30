const mongoose = require('mongoose');


const prontuarioSchema = new mongoose.Schema({
    profissionalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Profissional', required: true  },// Referência ao Profissional.
    pacienteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Paciente', required: true}, // Referência ao Paciente.
    avaliacaoDemanda: { type: String },
    planoTrabalho: { type: String },
    evolucao: [{
        registro: {type: String},
        dataConsulta: {type: String},
    }],
    encaminhamentoEncerramento: {type: String}
})

const Prontuario = mongoose.model('Prontuario', prontuarioSchema);
module.exports = Prontuario; 
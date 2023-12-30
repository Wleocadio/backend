const mongoose = require('mongoose');


const agendamentoModel = new mongoose.Schema({


    dataHora: { type: Date, required: true },
    profissionalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Profissional', required: true  }, // Referência ao Profissional.,
    pacienteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Paciente'}, // Referência ao Profissional.
    statusConsulta: { type: String },
    Observações: { type: String },
    Prescrições: { type: String }

})

const Agendamento = mongoose.model('Agendamento', agendamentoModel);
module.exports = Agendamento;
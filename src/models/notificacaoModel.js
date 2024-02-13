const mongoose = require('mongoose');

const notificacao = new mongoose.Schema({
   profissionalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Profissional', required: true },
   pacienteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Paciente'}, // Referência ao paciente.
   dataHoraConsulta: { type: Date},
   statusNotificacao: {type: String}
});

const Notificacao = mongoose.model('Notificacao', notificacao);

module.exports = Notificacao;
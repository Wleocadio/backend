const mongoose = require('mongoose');

const fotoPerfilSchema = new mongoose.Schema({
    foto: { type: Buffer },
    profissionalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Profissional', required: true }
});

const FotoPerfil = mongoose.model('FotoPerfil', fotoPerfilSchema);

module.exports = FotoPerfil;
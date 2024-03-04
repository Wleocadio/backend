const mongoose = require('mongoose');
const bcrypt = require('bcrypt')


const acessoSchema = new mongoose.Schema({

    profissionalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Profissional', required: true }, // Referência ao Profissional.,
    usuario: { type: String, unique: true, lowercase: true },
    senha: { type: String },
    bloqueio: { type: Boolean, default: false },
    tentativas: { type: Number, default: 0 },
    plano: { type: String, default: 'Sem Plano' },

})

// Método para criptografar a senha antes de salvar
acessoSchema.pre('save', async function (next) {
    if (this.isModified('senha')) {
        this.senha = await bcrypt.hash(this.senha, 10);
    }
    next();
});

const Acesso = mongoose.model('Acesso', acessoSchema);
module.exports = Acesso;

// vai ser criado separado em uma colection que vai vincular com o id do profissional
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken');
const SMTP_CONFIG = require('../config/smtp')
const Profissional = require('../models/profissionalModel');
require('dotenv').config();
const pass = process.env.Senha
const transporter = nodemailer.createTransport({

    host: SMTP_CONFIG.host,
    secureConnection: false,
    port: SMTP_CONFIG.port,
    tls: {
        ciphers: 'SSLv3'
    },
    auth: {
        user: SMTP_CONFIG.user,
        pass: pass

    },

})

function gerarToken(id) {
    const secretKey = process.env.TokenEmail; // Substitua por sua chave secreta real
    const token = jwt.sign(
        { _id: id }, // Payload do token
        secretKey,
        { expiresIn: '1h' } // Opções do token, como tempo de expiração
    );

    return token;
}

exports.solicitarSenha = async (req, res) => {
    const { email } = req.body;
    const usuario = await Profissional.findOne({ 'Contato.email': email });
    const emailUsuario = usuario.Contato.email
    const id = usuario._id

    console.log(email)
    console.log(id)

    if (emailUsuario == "") {
        return res.status(404).json({ Mensagem: 'E-mail não encontrado' });
    }
    //console.log(auth.pass)
    try {
        // Aqui, você deve gerar um token único e salvar na base de dados
        // associado ao e-mail do usuário. Exemplo simplificado:
        const token = gerarToken(id);
        const linkAlteracao = `http://seuwebsite.com/alterar-senha?token=${token}`;
        console.log(token)
       
        /*     await transporter.sendMail({
                 from: 'Alterar senha <wleocadio_@outlook.com>',
                 to: emailUsuario,
                 subject: 'Alteração de Senha',
                 html: `<p>Para alterar sua senha, clique no link abaixo:</p><a href="${linkAlteracao}">Alterar Senha</a>`
             });
     */
        res.status(200).json({ Mensagem: 'E-mail de alteração de senha enviado.', token });
    } catch (error) {
        console.error('Erro ao enviar e-mail de alteração de senha:', error);
        res.status(500).json({ Mensagem: 'Erro ao enviar e-mail de alteração de senha.' });
    }
};

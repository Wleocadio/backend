const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken');
const Profissional = require('../models/profissionalModel');
require('dotenv').config();

const transporter = nodemailer.createTransport({

    host: process.env.SMTP_HOST,
    secureConnection: false,
    port: process.env.SMTP_PORT,
    tls: {
        ciphers: 'SSLv3'
    },
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS

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
    
    const usuario = await Profissional.findOne({ 'Contato.email': email.toLowerCase() });

    if (usuario == "" || usuario == null) {
        return res.status(404).json({ Mensagem: 'E-mail não encontrado' });
    }
    console.log(usuario)
    console.log(email)
    const emailUsuario = usuario.Contato.email
    const id = usuario._id



    if (emailUsuario == "") {
        return res.status(404).json({ Mensagem: 'E-mail não encontrado' });
    }
    //console.log(auth.pass)
    try {
        // Aqui, você deve gerar um token único e salvar na base de dados
        // associado ao e-mail do usuário. Exemplo simplificado:
        const token = gerarToken(id);
        const linkAlteracao = `http://localhost:3000/password?token=${token}`;


        await transporter.sendMail({
            from: 'Alterar senha <wleocadio_@outlook.com>',
            to: emailUsuario,
            subject: 'Alteração de Senha',
            html: `<p>Para alterar sua senha, clique no link abaixo:</p><a href="${linkAlteracao}">Altere sua Senha</a>`
        });

        res.status(200).json({ Mensagem: 'E-mail de alteração de senha enviado.', token });
    } catch (error) {
        console.error('Erro ao enviar e-mail de alteração de senha:', error);
        res.status(500).json({ Mensagem: 'Erro ao enviar e-mail de alteração de senha.' });
    }
};

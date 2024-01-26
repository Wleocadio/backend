const Acesso = require('../models/acessoModel');
const Profissional = require('../models/profissionalModel');
const bcrypt = require('bcrypt');

exports.criarAcesso = async (req, res) => {
    const profissionalId = req.params.profissionalId; // Referência ao Profissional.
    try {
        const verificaProfissional = await Profissional.findById(profissionalId);
        //console.log(verificaProfissional)
    } catch (error) {
        return res.status(404).json({ Mensagem: 'Profissional não encontrado!' })
    }

    const {
        usuario,
        senha,
        bloqueio,
        tentativas,
        plano,
    } = req.body;
    //console.log(profissionalId)

    // --- Validações --

    const verificaCadastro = await Acesso.findOne({ profissionalId })
    if (verificaCadastro) {
        return res.status(500).json({ Mensagem: 'Você já tem cadastro.' })
    }

    const verificaUsuario = await Acesso.findOne({ usuario })
    if (verificaUsuario) {
        return res.status(500).json({ Mensagem: 'Usuário já existe.' })
    }




    try {
        const novoAcesso = new Acesso({
            profissionalId, // Referência ao Profissional.,
            usuario,
            senha,
            bloqueio,
            tentativas,
            plano,
        });
        await novoAcesso.save();

        res.status(200).json(novoAcesso);

    }
    catch (error) {

        res.status(500).json({ Mensagem: 'Erro ao criar Usuário' });
    }
}


exports.atualizarAcesso = async (req, res) => {
    const profissionalId = req.params.profissionalId;
    const verificaCadastro = await Acesso.findOne({ profissionalId });

    if (!verificaCadastro) {
        return res.status(500).json({ Mensagem: 'Cadastro não encontrado.' });
    }

    const senhaHash = verificaCadastro.senha;
    const usuarioCadastrado = verificaCadastro.usuario;
    const idAcesso = verificaCadastro._id;

    const { usuario, senhaAtual, novaSenha } = req.body;

    if (usuarioCadastrado !== usuario) {
        return res.status(400).json({ Mensagem: "Usuário Incorreto." });
    }

    // Compara o valor da senhaAtual com a senhaHash salva no banco
    try {
        const isMatch = await bcrypt.compare(senhaAtual, senhaHash);
        if (!isMatch) {
            return res.status(400).json({ Mensagem: "Senha Atual Incorreta." });
        }

        const senhaCriptografada = await bcrypt.hash(novaSenha, 10);
        await Acesso.findByIdAndUpdate(idAcesso, {
            usuario,
            senha: senhaCriptografada,
        });

        res.status(201).json({ Mensagem: 'Senha alterada com Sucesso.' });
    } catch (err) {
        res.status(500).json({ Mensagem: 'Erro ao processar a solicitação.' });
    }

}
const Acesso = require('../models/acessoModel');
const Profissional = require('../models/profissionalModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

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

        res.status(200).json({ Mensagem: 'Senha alterada com Sucesso.' });
    } catch (err) {
        res.status(500).json({ Mensagem: 'Erro ao processar a solicitação.' });
    }

}

exports.recuperarSenha = async (req, res) => {
    let idUsuario
    const { novaSenha, novaSenhaRepitir, token } = req.body;
    
    //console.log(token)
    try {
    const decoded = jwt.verify(token, process.env.TokenEmail);
    idUsuario = decoded._id;

    } catch (error) {
        return res.status(500).json({Mensagem: 'Token inválido'})
    }
    
    //console.log(idUsuario)


    const verificaCadastro = await Acesso.findOne({ profissionalId: idUsuario });
    if (!verificaCadastro) {
        return res.status(500).json({ Mensagem: 'Cadastro não encontrado.' });
    }
    
    const idAcesso = verificaCadastro._id;


    if (novaSenha != novaSenhaRepitir || novaSenhaRepitir != novaSenha) {
        return res.status(500).json({ Mensagem: 'As senhas são diferentes.' });
    }

  
    try {     
        const senhaCriptografada = await bcrypt.hash(novaSenha, 10);
        await Acesso.findByIdAndUpdate(idAcesso, {
            senha: senhaCriptografada,
        });

        res.status(200).json({ Mensagem: 'Senha alterada com Sucesso.' });
    } catch (err) {
        res.status(500).json({ Mensagem: 'Erro ao processar a solicitação.' });
    }

}

exports.login = async (req, res) => {
    const { usuario, senha, } = req.body;

    try {
        const user = await Acesso.findOne({ usuario });

        if (!user) {
            return res.status(500).json({ Mensagem: 'Usuário não encontrado' })
        }

        if (user.bloqueio) {
            return res.status(401).json({ Mensagem: 'Conta bloqueada devido a tentativas de login malsucedidas.' });
        }

        const senhaHash = user.senha
        const userId = user._id
        const userProfissional = user.profissionalId
        const userUsuario = user.usuario
        const isMatch = await bcrypt.compare(senha, senhaHash);
        //console.log(isMatch)
        //console.log(senhaHash)
        if (!isMatch) {
            user.tentativas += 1;

            if (user.tentativas >= 3) {
                user.bloqueio = true;
                await user.save();
                return res.status(401).json({ Mensagem: 'Conta bloqueada devido a tentativas de login malsucedidas.' });
            }

            await user.save();
            return res.status(400).json({ Mensagem: "Senha Atual Incorreta. Tentativas restantes: " + (3 - user.tentativas) });
        }

        // Reset tentativas de login após login bem-sucedido
        user.tentativas = 0;
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '3h' })

        // console.log(token)
        res.status(200).json({ Mensagem: 'Login efetuado com Sucesso.', userId, userProfissional, userUsuario, token });
    } catch (err) {
        res.status(500).json({ Mensagem: 'Erro ao processar a solicitação.' });
    }

}
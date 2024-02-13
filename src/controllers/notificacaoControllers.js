const Notificacao = require('../models/notificacaoModel')
const Profissional = require('../models/profissionalModel')

exports.obterNotificacao = async (req, res) => {
    try {
        const notificacao = await Notificacao.find();

        res.status(200).json(notificacao);
    } catch (error) {
        res.status(500).json({ Mensagem: 'Erro ao buscar notificações' })
    }
}

exports.obterNotificacaoProfissional = async (req, res) => {

    try {
        const notificacao = await Notificacao.find({ profissionalId: req.params.profissionalId })
        if (notificacao == "") {
            return res.status(404).json({ Mensagem: 'Não existe notificações para esse Profissional.' })
        }

        res.status(200).json(notificacao);
    } catch (error) {
        res.status(500).json({ Mensagem: 'Erro ao buscar notificações' })
    }
}

exports.atualizarNotificacaoProfissional = async (req, res) => {

    const notificacaoId = req.params.notificacaoId
    try {
        const notificacao = await Notificacao.findById(notificacaoId)
        if (notificacao == "") {
            return res.status(404).json({ Mensagem: 'Não existe notificações para esse Profissional.' })
        }
        const {statusNotificacao}= req.body;

        await Notificacao.findByIdAndUpdate(notificacaoId,{
            statusNotificacao
        })
       return res.status(200).json({Mensagem: 'Notificação atualizada com sucesso'});
    } catch (error) {
        res.status(500).json({ Mensagem: 'Erro ao buscar notificações' })
    }
}
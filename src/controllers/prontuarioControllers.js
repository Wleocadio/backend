const Prontuario = require('../models/prontuarioModel');
const Profissional = require('../models/prontuarioModel');
const Paciente = require('../models/prontuarioModel');



// Criar um Prontuário
exports.criarProntuario = async (req, res) => {
    const {
        profissionalId,
        pacienteId, // Referência ao Paciente.
        avaliacaoDemanda,
        planoTrabalho,
        evolucao,
        encaminhamentoEncerramento
    } = req.body;

    // Verifica se o Profissional e o Paciente informados existem no banco de dados.
    try {
        const verificaProfissional = await Profissional.findById(profissionalId);
        //console.log(verificaProfissional)
        try {
            const verificaPaciente = await Paciente.findById(pacienteId);
            // console.log(verificaPaciente)
        } catch (error) {
            return res.status(404).json({ Mensagem: 'Paciente não encontrado!' })
        }
    } catch (error) {
        return res.status(404).json({ Mensagem: 'Profissional não encontrado!' })
    }


    try {
        const novoProntuario = new Prontuario({
            profissionalId, // Referência ao Profissional.
            pacienteId, // Referência ao Paciente.
            avaliacaoDemanda,
            planoTrabalho,
            evolucao,
            encaminhamentoEncerramento
        });

        await novoProntuario.save();

        res.status(200).json(novoProntuario);
    } catch (error) {
        res.status(500).json({Mensagem: 'Erro ao cria prontuário.'})
    }
}

// Busca todos os prontuario cadstrados
exports.obterProntuario = async (req, res) => {
    try {
        const prontuario = await Prontuario.find();

        res.status(200).json(prontuario);
    } catch (error) {
        res.status(500).json({ Mensagem: 'Erro ao buscar prontuarios' })
    }
}


// Busca todos os prontuario vinculado ao profissional pesquisado
exports.obterProntuarioProfissional = async (req, res) => {
    try {
        const prontuario = await Prontuario.find({ profissionalId: req.params.profissionalId });

        // Verifica se o retorno do banco esta vazio.
        if(prontuario == ""){
            return res.status(404).json({Mensagem: 'Não existe prontuários vinculados a esse Profissional.'})
        }

        res.status(200).json(prontuario);
    } catch (error) {
        res.status(500).json({ Mensagem: 'Profissional não encontrado.' })
    }
}


// Busca todos os prontuario vinculado ao paciente pesquisado
exports.obterProntuarioPaciente = async (req, res) => {
    try {
        const prontuario = await Prontuario.find({ pacienteId: req.params.pacienteId });

        // Verifica se o retorno do banco está vazio.
        if (prontuario == "") {
            return res.status(404).json({Mensagem: 'Não existe prontuário para esse Paciente.'})
        }

        res.status(200).json(prontuario);
    } catch (error) {
        res.status(500).json({ Mensagem: 'Erro ao buscar prontuario por Paciente' })
    }
}


// Conta quantos registro tem na collection de prontuario
exports.contarDocumentoProntuario = async (req, res) => {
    try {
        const contarDocumento = await Prontuario.countDocuments()

        if (contarDocumento == "") {
            return res.status(404).json({Mensagem: 'Não existem registros.'})
        }

        res.status(200).json(contarDocumento);
    } catch (error) {
        res.status(500).json({ Mensagem: 'Ocorreu um erro ao contar os registros' })
    }
}
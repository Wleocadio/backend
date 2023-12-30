
const Agendamento = require('../models/agendamentoModel')
const Profissional = require('../models/profissionalModel')
const Paciente = require('../models/pacienteModel')


// Cria um novo agendamento
exports.criarAgendamento = async (req, res) => {
    const {
        dataHora,
        profissionalId, // Referência ao Profissional.,
        pacienteId, // Referência ao Profissional.
        statusConsulta,
        Observações,
        Prescrições
    } = req.body;

    // --- Validações --
    //Verifica se já existe essa data registrada no banco
    const verificaDataHora = await Agendamento.findOne({ dataHora })
    if (verificaDataHora) {
        return res.status(500).json({ Mensagem: 'Já existe agendamento nessa data.' })
    }

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
        const novoAgendamento = new Agendamento({
            dataHora,
            profissionalId, // Referência ao Profissional.,
            pacienteId, // Referência ao Profissional.
            statusConsulta,
            Observações,
            Prescrições
        });
        await novoAgendamento.save();

        res.status(200).json(novoAgendamento);
    } catch (error) {
        res.status(500).json({ Mensagem: 'Erro ao criar agendamento' });
    }
}


// Busca todos os agendamentos cadstrados
exports.obterAgendamento = async (req, res) => {
    try {
        const agendamento = await Agendamento.find();

        res.status(200).json(agendamento);
    } catch (error) {
        res.status(500).json({ Mensagem: 'Erro ao buscar adangamento' })
    }
}


// Busca todos os agendamentos vinculado ao profissional pesquisado
exports.obterAgendamentoProfissional = async (req, res) => {
    try {
        const agendamento = await Agendamento.find({ profissionalId: req.params.profissionalId });

        res.status(200).json(agendamento);
    } catch (error) {
        res.status(500).json({ Mensagem: 'Erro ao buscar adangamento' })
    }
}


// Busca todos os agendamentos vinculado ao paciente pesquisado
exports.obterAgendamentoPaciente = async (req, res) => {
    try {
        const agendamento = await Agendamento.find({ pacienteId: req.params.pacienteId });

        res.status(200).json(agendamento);
    } catch (error) {
        res.status(500).json({ Mensagem: 'Erro ao buscar adangamento' })
    }
}


// Conta quantos registro tem na collection de agendamento
exports.contarDocumentoAgendamento = async (req, res) => {
    try {
        const agendamento = await Agendamento.countDocuments()

        res.status(200).json(agendamento);
    } catch (error) {
        res.status(500).json({ Mensagem: 'Não existem registros.' })
    }
}
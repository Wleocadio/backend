
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

    const verificaProfissionail = await Profissional.findById(profissionalId)

    if (verificaProfissionail == null) {
        return res.status(404).json({ Mensagem: 'Profissional não existe.' })
    }

    const verificaPaciente = await Paciente.findById(pacienteId)

    if (verificaPaciente == null) {
        return res.status(404).json({ Mensagem: 'Paciente não existe.' })
    }
    //Verifica se já existe essa data registrada no banco
    const verificaDataHora = await Agendamento.findOne({
        dataHora: dataHora,
        profissionalId: profissionalId
      });
    if (verificaDataHora) {
        return res.status(500).json({ Mensagem: 'Já existe agendamento nessa data.' })
    }



    // Verifica se o Profissional e o Paciente informados existem no banco de dados.


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
        res.status(500).json({ Mensagem: 'Erro ao buscar agendamentos' })
    }
}


// Busca todos os agendamentos vinculado ao profissional pesquisado
exports.obterAgendamentoProfissional = async (req, res) => {
    try {
        const agendamento = await Agendamento.find({ profissionalId: req.params.profissionalId });
        if (agendamento == "") {
            return res.status(404).json({ Mensagem: 'Não existe agendamento para esse Profissional.' })
        }
        res.status(200).json(agendamento);
    } catch (error) {
        res.status(500).json({ Mensagem: 'Erro ao buscar agendamento' })
    }
}


// Busca todos os agendamentos vinculado ao paciente pesquisado
exports.obterAgendamentoPaciente = async (req, res) => {
    try {
        const agendamento = await Agendamento.find({ pacienteId: req.params.pacienteId });
        if (agendamento == "") {
            return res.status(404).json({ Mensagem: 'Não existe agendamento para esse Paciente.' })
        }
        res.status(200).json(agendamento);
    } catch (error) {
        res.status(500).json({ Mensagem: 'Erro ao buscar agendamento' })
    }
}


// Conta quantos registro tem na collection de agendamento
exports.contarDocumentoAgendamento = async (req, res) => {
    try {
        const contarDocumento = await Agendamento.countDocuments()

        if (contarDocumento == "") {
            return res.status(404).json({ Mensagem: 'Não existem registros.' })
        }

        res.status(200).json(contarDocumento);
    } catch (error) {
        res.status(500).json({ Mensagem: 'Ocorreu um erro ao contar os registros' })
    }
}


exports.atualizarAgendamento = async (req, res) => {
    const agendamentoId = req.params.agendamentoId
    try {
        // console.log(agendamentoId)
        const agendamento = await Agendamento.findById(agendamentoId);
        if (agendamento == "") {
            return res.status(404).json({ Mensagem: 'Não existe agendamento.' })
        }
        const {
            dataHora,
            // profissionalId, // Referência ao Profissional.,
            pacienteId, // Referência ao Profissional.
            statusConsulta,
            Observações,
            Prescrições
        } = req.body;

        const verificaDataHora = await Agendamento.findOne({ dataHora })
        if (verificaDataHora) {
            return res.status(500).json({ Mensagem: 'Já existe agendamento nessa data.' })
        }

        await Agendamento.findByIdAndUpdate(agendamentoId, {
            dataHora,
            pacienteId, // Referência ao Profissional.
            statusConsulta,
            Observações,
            Prescrições
        })
        return res.status(200).json({ Mensagem: 'Agendamento atualizado com sucesso' })
    } catch (error) {
        return res.status(500).json({ Mensagem: 'Erro ao atualizar agendamento.' })
    }



}
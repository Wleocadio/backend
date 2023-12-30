const Paciente = require('../models/pacienteModel')


// Buscar todos os pacientes cadastrados
exports.obterPaciente = async (req, res) => {
    try {
        const paciente = await Paciente.find();

        // Organizar campos na ordem desejada (exemplo: _id, nomeCompleto, etc..)
        const pacientesFormatados = paciente.map(paciente => {
            const { _id,
                nomeCompleto,
                documento,
                dataNascimento,
                sexo,
                endereco,
                acesso,
                email,
                contato,
                contatoEmergencia,
                prontuario,
                profissionalId
            } = paciente._doc;
            return {
                _id,
                nomeCompleto,
                documento,
                dataNascimento,
                sexo,
                endereco,
                acesso,
                email,
                contato,
                contatoEmergencia,
                prontuario,
                profissionalId
            };
        });

        res.status(200).json(pacientesFormatados);
    } catch (error) {
        res.status(500).json({ Mensagem: 'Erro ao buscar Pacientes.' })
    }
}

// Buscar paciente vinculados a um profissional
exports.obterPacientePorProfissional = async (req, res) => {
    try {
        const paciente = await Paciente.find({ profissionalId: req.params.profissionalId });

        if (paciente == "") {
            return res.status(404).json({Mensagem: 'Não existe paciente vinculado a esse Profissional.'})
        }

        // Valida se existe pacientes vinculados a esse profissional.
        //if (paciente.length === 0) {
        //    return res.status(500).json({ Mensagem: 'Não existe paciente vinculado a esse Profissional.' })
        //}
        // Organizar campos na ordem desejada (exemplo: _id, nomeCompleto, etc..)
        const pacientesFormatados = paciente.map(paciente => {
            const { _id,
                nomeCompleto,
                documento,
                dataNascimento,
                sexo,
                endereco,
                acesso,
                email,
                contato,
                contatoEmergencia,
                prontuario,
                profissionalId
            } = paciente._doc;
            return {
                _id,
                nomeCompleto,
                documento,
                dataNascimento,
                sexo,
                endereco,
                acesso,
                email,
                contato,
                contatoEmergencia,
                prontuario,
                profissionalId
            };
        });

        // Retorna o que foi encontrado no banco
        res.status(200).json(pacientesFormatados);
    } catch (error) {
        res.status(500).json({ Mensagem: 'Erro ao buscar Pacientes vinculado a um Profissional.' })
    }
}


// Contar quantos registro tem na collection Paciente
exports.contarDocumentoPaciente = async (req, res) => {
    try {
        const contarDocumento = await Paciente.countDocuments()

        if (contarDocumento == "") {
            return res.status(404).json({Mensagem: 'Não existem registros.'})
        }

        res.status(200).json(contarDocumento);
    } catch (error) {
        res.status(500).json({ Mensagem: 'Ocorreu um erro ao contar os registros' })
    }

}


// Criar um novo paciente
exports.criarPaciente = async (req, res) => {
    const {
        nomeCompleto,
        documento,
        dataNascimento,
        sexo,
        endereco,
        acesso,
        email,
        contato,
        contatoEmergencia,
        prontuario,
        profissionalId
    } = req.body;

    // --- Validações ---

    // Verifica se já existe paciente cadastrado com esse documento.
    const numeroDocumento = await Paciente.findOne({ 'documento.numeroDocumento': documento.numeroDocumento })
    if (numeroDocumento) {
        return res.status(400).json({ Mensagem: 'Documento já cadastrado.' })
    }

    // código para receber os dados e salvar no banco
    try {

        const prontuarios = prontuario.map(pront => ({
            avaliacaoDemanda: pront.avaliacaoDemanda,
            progresso: pront.progresso,
            encaminhamento: pront.encaminhamento,
            informacoesGeral: pront.informacoesGeral,
            status: pront.status
        }))

        const novoPaciente = new Paciente({
            nomeCompleto,
            documento,
            dataNascimento,
            sexo,
            endereco,
            acesso,
            email,
            contato,
            contatoEmergencia,
            prontuario: prontuarios,
            profissionalId,
        })

        await novoPaciente.save();

        res.status(200).json(novoPaciente);

    } catch (error) {
        res.status(500).json({ Mensagem: 'Erro ao criar Paciente.' });
    }
}
















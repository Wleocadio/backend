const Profissional = require('../models/profissionalModel');


// Busca todos os profissionais cadastrados
exports.obterProfissional = async (req, res) => {
    try {
        const profissionais = await Profissional.find();

        // Organizar campos na ordem desejada (exemplo: _id, nomeCompleto, etc..)
        const profissionaisFormatados = profissionais.map(profissional => {
            const { _id,
                nomeCompleto,
                documento,
                registroProfissional,
                acesso,
                perfilAcessoId,
                descricao,
                Contato,
                endereco,
                especialidade,
                experiencia,
                formacao,
                descricaoPessoal,
                politicaRemarcacao,
                horarioAtendimento,
                valorConsulta,
                tempoSessao,
                redesSociais,
                avaliacoes,
                quantidadesAtendimentos
            } = profissional._doc;
            return {
                _id,
                nomeCompleto,
                documento,
                registroProfissional,
                acesso,
                perfilAcessoId,
                descricao,
                Contato,
                endereco,
                especialidade,
                experiencia,
                formacao,
                descricaoPessoal,
                politicaRemarcacao,
                horarioAtendimento,
                valorConsulta,
                tempoSessao,
                redesSociais,
                avaliacoes,
                quantidadesAtendimentos
            };
        });

        // retorna os dados consultados no banco
        res.status(200).json(profissionaisFormatados);

    } catch (error) {
        res.status(500).json({ Mensagem: 'Erro ao buscar Profissionais.' });
    }
}
// Cria um novo profissional
exports.criarProfissional = async (req, res) => {
    const {
        nomeCompleto,
        documento,
        registroProfissional,
        acesso,
        perfilAcessoId,
        descricao,
        Contato,
        endereco,
        especialidade,
        experiencia,
        formacao,
        descricaoPessoal,
        politicaRemarcacao,
        horarioAtendimento,
        valorConsulta,
        tempoSessao,
        redesSociais,
        avaliacoes,
        quantidadesAtendimentos
    } = req.body;

    //Validações
    // Exemplo de validação: Verifica se o e-mail é um e-mail válido
    if (Contato && Contato.email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(Contato.email)) {
            return res.status(400).json({ Mensagem: 'E-mail inválido' });
        }
    }
    // Verifica se o e-mail já esta cadastrado
    const emailExistente = await Profissional.findOne({ 'Contato.email': Contato.email });
    if (emailExistente) {
        return res.status(400).json({ Mensagem: 'E-mail já cadastrado.' });

    }
    // Verifica se o documento já esta cadastrado
    const numeroDocumento = await Profissional.findOne({ 'documento.numeroDocumento': documento.numeroDocumento });
    if (numeroDocumento) {
        return res.status(400).json({ Mensagem: 'Documento já cadastrado' });
    }

    // código para receber os dados e salvar no banco
    try {

        const horariosDeAtendimento = horarioAtendimento.map(horario => ({
            data: horario.data,
            horaInicio: horario.horaInicio,
            horaFim: horario.horaFim,
            status: horario.status,
        }));

        const novoProfissional = new Profissional({
            nomeCompleto,
            documento,
            registroProfissional,
            acesso,
            perfilAcessoId,
            descricao,
            Contato,
            endereco,
            especialidade,
            experiencia,
            formacao,
            descricaoPessoal,
            politicaRemarcacao,
            horarioAtendimento: horariosDeAtendimento,
            valorConsulta,
            tempoSessao,
            redesSociais,
            avaliacoes,
            quantidadesAtendimentos
        });
        //salva o profissional no banco
        await novoProfissional.save();

        //Retorna os dados que foram salvos
        res.status(201).json(novoProfissional);
    } catch (error) {
        res.status(400).json({ Mensagem: 'Erro ao cadastrar Profissional' });
    }
}
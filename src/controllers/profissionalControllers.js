const Profissional = require('../models/profissionalModel');
const validarCPF = require('../functions/validacaoCPF');
const validarCNPJ = require('../functions/validacaoCNPj');



// Busca todos os profissionais cadastrados
exports.obterProfissional = async (req, res) => {
    try {
        const profissionais = await Profissional.find();

        // Verifica se o retorno do banco esta vazio.
        if (profissionais == "") {
            return res.status(404).json({ Mensagem: 'Nenhum Profissional encontrado.' })
        }
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


// Busca pelo Id do profissional
exports.obterProfissionalId = async (req, res) => {

    try {
        const profissionalId = req.params.profissionalId
        const profissional = await Profissional.find({ _id: profissionalId });

        //console.log(profissional)
        // Organizar campos na ordem desejada (exemplo: _id, nomeCompleto, etc..)
        const profissionaisFormatados = profissional.map(profissional => {
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

        res.status(500).json({ Mensagem: 'Não foi possivel localizar um Profissional com esse ID.' });
    }



}

// Conta os registro da collection profissional
exports.contarDocumentoProfissional = async (req, res) => {

    try {
        const contarDocumento = await Profissional.countDocuments()

        // Verifica se o retorno do banco esta vazio.
        if (contarDocumento == "") {
            return res.status(404).json({ Mensagem: 'Não existem registros.' })
        }

        res.status(200).json(contarDocumento);
    } catch (error) {
        res.status(500).json({ Mensagem: 'Ocorreu um erro ao contar os registros' })
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

    // --- Validações ---
    // Verifica se o e-mail é um e-mail válido
    if (Contato && Contato.email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(Contato.email)) {
            return res.status(404).json({ Mensagem: 'E-mail inválido' });
        }
    }
    // Verifica se o e-mail já esta cadastrado
    const emailExistente = await Profissional.findOne({ 'Contato.email': Contato.email });
    if (emailExistente) {
        return res.status(404).json({ Mensagem: 'E-mail já cadastrado.' });

    }
    // Verifica se o documento já esta cadastrado
    const numeroDocumento = await Profissional.findOne({ 'documento.numeroDocumento': documento.numeroDocumento });
    if (numeroDocumento) {
        return res.status(404).json({ Mensagem: 'Documento já cadastrado' });


    }

    // Verifica o tipo de documento e se está no formato válido.
    if (documento.tipo !== 'CPF' && documento.tipo !== 'CNPJ') {
        console.log(documento.tipo)
        console.log(cpf, cnpj)
        return res.status(404).json({ Mensagem: 'Tipo de documento inválido.' })
    }

    // Se for documento do tipo CPF, ele faz uma válidação
    if (documento.tipo == "CPF") {
        const cpf = documento.numeroDocumento
        console.log(cpf)
        if (!validarCPF(cpf)) {
            return res.status(404).json({ Mensagem: 'CPF inválido.' })

        }
    }

    // Se for documento do tipo CNPJ, ele faz uma válidação
    if (documento.tipo == "CNPJ") {
        const cnpj = documento.numeroDocumento
        console.log(cnpj)

        if (!validarCNPJ(cnpj)) {
            return res.status(404).json({ Mensagem: 'CNPJ inválido.' })
        }
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


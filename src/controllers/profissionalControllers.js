const Profissional = require('../models/profissionalModel');
//const validarCPF = require('../functions/validacaoCPF');
//const validarCNPJ = require('../functions/validacaoCNPj');
//const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
//const numeroRegex = /^\d+$/;
const {validarDadosProfissional} = require('../functions/validarProfissional')
const {validarDadosProfissionalAtualizacao} = require('../functions/atualizaProfissional')

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
       // acesso,
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
//console.log(nomeCompleto)
    const validacao = await validarDadosProfissional(Profissional, { Contato, documento, endereco, registroProfissional, valorConsulta, quantidadesAtendimentos, tempoSessao }, res);
    if (validacao) {
        return validacao; // Retorna a resposta da validação, se houver algum erro
    }

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
            //acesso,
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

// Atualizar Profissional
exports.atualizarProfissional = async (req, res) => {
    const profissionalId = req.params.profissionalId

        const profissional = await Profissional.findById(profissionalId);
        if (!profissional) {
            return res.status(404).json({ Mensagem: 'Profissional não encontrado' });
        }
        //console.log(profissional)
        const {
        nomeCompleto,
        Contato,
        registroProfissional,
        descricao,
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
    } = req.body;

    const validacao = await validarDadosProfissionalAtualizacao(Profissional, {Contato, endereco, registroProfissional, valorConsulta, tempoSessao }, res);
   
    if (validacao) {
        
       return validacao; // Retorna a resposta da validação, se houver algum erro
       
    }

        const horariosDeAtendimento = horarioAtendimento.map(horario => ({
            data: horario.data,
            horaInicio: horario.horaInicio,
            horaFim: horario.horaFim,
            status: horario.status,
        }));

        await Profissional.findByIdAndUpdate(profissionalId, {
            nomeCompleto,
            registroProfissional,
            descricao,
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
        });

        
        res.status(201).json({Mensagem: 'Profissional atualizado com sucesso'});
    
}

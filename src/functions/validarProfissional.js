const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
const numeroRegex = /^\d+$/;
const validarCPF = require('../functions/validacaoCPF');
const validarCNPJ = require('../functions/validacaoCNPj');
const Joi = require('joi');

async function validarDadosProfissional(Profissional, { Contato, documento, endereco, registroProfissional, valorConsulta, quantidadesAtendimentos, tempoSessao }, res) {
    
    // --- Validações ---
        // Verifica se o e-mail é um e-mail válido
        if (Contato && Contato.email) {
            // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(Contato.email)) {
                return res.status(400).json({ Mensagem: 'E-mail inválido' });
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
            return res.status(400).json({ Mensagem: 'Documento já cadastrado' });
    
    
        }
    
        // Verifica campos vazios ou nullos
      //  if(Profissional.nomeCompleto == "" && Profissional.nomeCompleto == null){
      //      return res.status(400).json({ Mensagem: 'Informe um Nome válido!'})
      //  }
    
       // if(documento.numeroDocumento == "" && documento.numeroDocumento== null){
       //     return res.status(400).json ({ Mensagem: 'Informa um documento válido!'})
       // }
    
    
    
    
    
    
        // Verifica o tipo de documento e se está no formato válido.
        if (documento.tipo !== 'CPF' && documento.tipo !== 'CNPJ') {
            return res.status(400).json({ Mensagem: 'Tipo de documento inválido.' })
        }
    
        // Se for documento do tipo CPF, ele faz uma válidação
        if (documento.tipo == "CPF") {
            const cpf = documento.numeroDocumento
            console.log(cpf)
            if (!validarCPF(cpf)) {
                return res.status(400).json({ Mensagem: 'CPF inválido.' })
    
            }
        }
    
        // Se for documento do tipo CNPJ, ele faz uma válidação
        if (documento.tipo == "CNPJ") {
            const cnpj = documento.numeroDocumento
            console.log(cnpj)
    
            if (!validarCNPJ(cnpj)) {
                return res.status(400).json({ Mensagem: 'CNPJ inválido.' })
            }
        }
    
        //Validação de campos numéricos
        if (Contato) {
            // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!numeroRegex.test(Contato.whatsApp)) {
                return res.status(400).json({ Mensagem: 'WhatsApp inválido' });
            }
            if (!numeroRegex.test(Contato.telefone)) {
                return res.status(400).json({ Mensagem: 'Telefone inválido' });
            }
        }
        if (endereco) {
            // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!numeroRegex.test(endereco.numeroResidencia)) {
                return res.status(400).json({ Mensagem: 'Numero da Residência inválido' });
            }
        }
        if (!numeroRegex.test(registroProfissional.numeroRegistro)) {
            return res.status(400).json({ Mensagem: 'Numero do Registro inválido' });
        }
        console.log(valorConsulta)
        if (!numeroRegex.test(valorConsulta)) {
            return res.status(400).json({ Mensagem: 'Valor da Consulta inválido' });
        }
        if (!numeroRegex.test(quantidadesAtendimentos)) {
            return res.status(400).json({ Mensagem: 'Quantidade de atendimento inválido' });
        }
        console.log(tempoSessao)
        if (!numeroRegex.test(tempoSessao)) {
            return res.status(400).json({ Mensagem: 'Tempo de Sessão inválido' });
        }
        
    
    
    }
    
    module.exports.validarDadosProfissional = validarDadosProfissional;
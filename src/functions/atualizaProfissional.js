const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
const numeroRegex = /^\d+$/;
const validarCPF = require('../functions/validacaoCPF');
const validarCNPJ = require('../functions/validacaoCNPj');

async function validarDadosProfissionalAtualizacao(Profissional, { Contato, endereco, registroProfissional, valorConsulta, quantidadesAtendimentos, tempoSessao }, res) {
    
// --- Validações ---

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
    console.log(tempoSessao)
    if (!numeroRegex.test(tempoSessao)) {
        return res.status(400).json({ Mensagem: 'Tempo de Sessão inválido' });
    }
    


}

module.exports.validarDadosProfissionalAtualizacao = validarDadosProfissionalAtualizacao;
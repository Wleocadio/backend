const cpfCheck = require('cpf-check');

function validarCPF(cpf) {
  // Remover caracteres não numéricos do CPF
  const cpfNumerico = cpf.replace(/\D/g, '');

  // Realizar a validação do CPF
  return cpfCheck.validate(cpfNumerico);
}

module.exports = validarCPF;
const { CNPJ } = require('cpf-cnpj-validator');

function validarCNPJ(cnpj) {
  // Remover caracteres não numéricos do CNPJ
  const cnpjNumerico = CNPJ.strip(cnpj);

  // Realizar a validação do CNPJ
  return CNPJ.isValid(cnpjNumerico);
}

module.exports = validarCNPJ;
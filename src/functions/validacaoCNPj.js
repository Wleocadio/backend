function validarCNPJ(numeroCNPJ) {
    const cnpjNumerico = numeroCNPJ.replace(/\D/g, '');
  
    if (cnpjNumerico.length !== 14) {
      return false;
    }
  
    const digitos = cnpjNumerico.split('').map(Number);
  
    // Calcular o primeiro dígito verificador
    let soma = 0;
    let peso = 5;
    for (let i = 0; i < 12; i++) {
      soma += digitos[i] * peso;
      peso = peso === 2 ? 9 : peso - 1;
    }
    const primeiroDigito = (soma % 11) < 2 ? 0 : 11 - (soma % 11);
  
    // Calcular o segundo dígito verificador
    soma = 0;
    peso = 6;
    for (let i = 0; i < 13; i++) {
      soma += digitos[i] * peso;
      peso = peso === 2 ? 9 : peso - 1;
    }
    const segundoDigito = (soma % 11) < 2 ? 0 : 11 - (soma % 11);
  
    // Verificar se os dígitos calculados correspondem aos dígitos informados
    return primeiroDigito === digitos[12] && segundoDigito === digitos[13];
  }
  
  module.exports = validarCNPJ;
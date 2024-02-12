const Bottleneck = require("bottleneck");

const limiter = new Bottleneck({
    maxConcurrent: 1, // 1 mensagem 
    minTime: 7000 //Intervalo de 7 segundos a cada envio
})


module.exports = limiter;
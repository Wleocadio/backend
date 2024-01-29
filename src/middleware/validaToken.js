const jwt = require('jsonwebtoken');
require('dotenv').config();

const validaToken = (req, res, next) => {
    const token = req.headers['authorization'];
    //console.log(token)
    if (!token) {
        return res.status(401).json({Mensagem: "Token no formato inválido."});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
       // console.log(decoded)
    } catch (err) {
        // Verificar se o token expirou
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({Mensagem: "Token expirado"});
        }

        return res.status(401).json({Mensagem: "Token inválido"});
    }
    return next();
};

module.exports = validaToken;
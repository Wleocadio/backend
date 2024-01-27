const jwt = require('jsonwebtoken');
require('dotenv').config();

const validaToken = (req, res, next) => {
    const token = req.headers['authorization'];
    console.log(token)
    if (!token) {
        return res.status(401).json({Mensagem: "Token no formato inválido."});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded)
        
    } catch (err) {
        return res.status(401).json({Mensagem: "Token Inválido."});
    }

    return next();
};

module.exports = validaToken;
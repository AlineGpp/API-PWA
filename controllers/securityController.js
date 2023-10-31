const { autenticationUserDB } = require('../useCases/securityUseCase');
require("dotenv-safe").config();
const jwt = require('jsonwebtoken');

const login = async (request, response) => {
    await autenticationUserDB(request.body)
        .then(user => {
            const token = jwt.sign({ user }, process.env.SECRET, {
                expiresIn: 3600 //expira em 5 min
            })
            return response.json({ auth: true, token: token })
        })
        .catch(err => response.status(401).json({ auth: false, message: err }));
}

// verificação do token
function verifyJWT(request, response, next) {
    const token = request.headers['authorization'];
    if (!token) return response.status(401).json({ auth: false, message: 'Nenhum token recebido.' });

    jwt.verify(token, process.env.SECRET, function (err, decoded) {
        if (err) return response.status(500).json({ auth: false, message: 'Erro ao autenticar o token.' });
        // Se o token for válido, salva no request para uso posterior
        //console.log("Usuario: " + JSON.stringify(decoded.user));
        request.user = decoded.user;
        next();
    });
}

module.exports = {
    login, verifyJWT
}
const { pool } = require('../config')
const Usuario = require('../entities/user')

const autenticaUsuarioDB = async (body) => {
    try {           
        const { login, password } = body
        const results = await pool.query(`SELECT * FROM people WHERE login = $1 AND password = $2`,
        [login, password]);
        
        if (results.rowCount == 0) {
            throw "Usuário ou tenha inválidos";
        }
        const usuario = results.rows[0];
        return new Usuario(usuario.email, usuario.login, usuario.name);
    } catch (err) {
        throw "Erro ao autenticar o usuário: " + err;
    }    
}

module.exports = {
    autenticaUsuarioDB
}




const { pool } = require('../config')
const User = require('../entities/user')  /// pedir se pode ser People ou não 

const autenticationUserDB = async (body) => {
    try {           
        const { login, password } = body
        const results = await pool.query(`SELECT * FROM people where login = $1 and password = $2`,
        [login, password]);
        
        if (results.rowCount == 0) {
            throw "Usuário ou senha inválidos";
        }
        const user = results.rows[0];
        return new User(user.id, user.name, user.e_mail, user.login);
    } catch (err) {
        throw "Erro ao autenticar o usuário: " + err;
    }    
}

module.exports = {
    autenticationUserDB
}
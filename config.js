const { Pool } = require("pg");

const isProduction = process.env.NODE_ENV === "production"; //para saber se está em ambiente de produção 

let pool = null; 

//Para cada tipo de ambinete um tipo de conexão com o banco 

if (isProduction) {
    pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    })
}else{
    pool = new Pool({
        user: "postgres",
        password: 'sql123',
        database: 'esystem',
        host: 'localhost',
        port: 5432
    })
}

module.exports = {pool};
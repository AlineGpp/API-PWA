const { pool } = require('../config');
const People = require('../entities/people')

const getPeoplesDB = async () => {
    try {    
        const { rows } = await pool.query('SELECT * FROM people order by name');
        return rows.map((people) => new People(people.id, people.name, people.sex, people.adress, people.complement, 
            people.district, people.zip_code , people.telephone, people.celular,  people.e_mail, people.profession, 
            people.login, people.password, people.city,people.address));        
    } catch (err) {
        throw "Erro : " + err;
    }
}

const addPeopleDB = async (body) => {
    try {   
        const {id,name, sex, adress, complement, district, zip_code , 
            telephone, celular,  e_mail, profession, login, password, city,address} = body; 
        const results = await pool.query(`INSERT INTO people (id,name, sex, adress, complement, district, 
            zip_code , telephone, celular,  e_mail, profession, login, password, city,address) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13,$14,$15)
            returning id, name, sex, adress, complement, district, zip_code , 
            telephone, celular,  e_mail, profession, login, password, city,address`,
        [id,name, sex, adress, complement, district, zip_code , 
            telephone, celular,  e_mail, profession, login, password, city,address]);
        const people = results.rows[0];
        return new People(people.id, people.name, people.sex, people.adress, people.complement, 
            people.district, people.zip_code , people.telephone, people.celular,  people.e_mail, people.profession, 
            people.login, people.password, people.city,people.address); 
    } catch (err) {
        throw "Erro ao inserir a pessoa: " + err;
    }    
}


const updatePeopleDB = async (body) => {
    try {   
        const { id, name, sex, adress, complement, district, zip_code , 
            telephone, celular,  e_mail, profession, login, password, city,address}  = body; 
        const results = await pool.query(`UPDATE people set name = $1, sex = $2, adress = $3, complement = $4, 
        district = $5, zip_code = $6 , telephone = $7, celular = $8, e_mail = $9, 
        profession = $10, login = $11, password = $12, city = $13,address = $14 where id = $15
        returning id, name, sex, adress, complement, district, zip_code , 
        telephone, celular,  e_mail, profession, login, password, city`,
        [name, sex, adress, complement, district, zip_code , 
            telephone, celular,  e_mail, profession, login, password, city,address, id]);        
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o ID ${id} para ser alterado`;
        }
        const people = results.rows[0];
        return new People(people.id, people.name, people.sex, people.adress, people.complement, 
            people.district, people.zip_code , people.telephone, people.celular,  people.e_mail, people.profession, 
            people.login, people.password, people.city,people.address); 
    } catch (err) {
        throw "Erro ao alterar a pessoa: " + err;
    }      
}

const deletePeopleDB = async (id) => {
    try {           
        const results = await pool.query(`DELETE FROM people where id = $1`,
        [id]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o ID ${id} para ser removido`;
        } else {
            return "Pessoa removida com sucesso";
        }       
    } catch (err) {
        throw "Erro ao remover a pessoa: " + err;
    }     
}

const getPeoplePorCodigoDB = async (id) => {
    try {           
        const results = await pool.query(`SELECT * FROM people where id = $1`,
        [id]);
        if (results.rowCount == 0){
            throw "Nenhum registro encontrado com o ID: " + id;
        } else {
            const people = results.rows[0];
            return new People(people.id, people.name, people.sex, people.adress, people.complement, 
                people.district, people.zip_code , people.telephone, people.celular,  people.e_mail, people.profession, 
                people.login, people.password, people.city,people.address); 
        }       
    } catch (err) {
        throw "Erro ao recuperar a pessoa: " + err;
    }     
}


module.exports = {
    getPeoplesDB, addPeopleDB, updatePeopleDB, deletePeopleDB, getPeoplePorCodigoDB
}

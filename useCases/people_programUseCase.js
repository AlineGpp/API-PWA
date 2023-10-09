const {pool} = require('../config');
const PeopleProgram = require('../entities/people_program');

const getPeopleProgramDB = async () => {
    try{
            const {rows} = await pool.query(`SELECT * FROM  people_program `);
            return rows.map(peopleprogram => new PeopleProgram(peopleprogram.program,peopleprogram.people));
    }catch(err){
        throw "Erro " + err;
    }
}


const addPeopleProgramDB = async (body) => {
    try{
        const {program,people} = body;
        const result = await pool.query(`INSERT INTO people_program (program,people) VALUES ($1,$2) RETURNING people,program`,[program,people]);
        //const people_program = result.rows; 
        return rows.map(peopleprogram => new PeopleProgram(peopleprogram.program,peopleprogram.people));
    }catch(err){
        throw "Erro " + err;
    }
}

module.exports = {
    getPeopleProgramDB,
    addPeopleProgramDB
}
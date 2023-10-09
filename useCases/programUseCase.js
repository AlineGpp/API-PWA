const {pool} = require("../config");
const Program = require("../entities/program");


const getProgramsDB = async () => {
    try{
        const {rows} = await pool.query(`SELECT * FROM program ORDER BY description`);
        return rows.map(program => new Program(program.id, program.description, program.alert, program.fulldescription, program.address, program.image));
    }catch(err){
        throw "Erro " + err;
    }
}


const addProgramDB = async (body) => {
    try {
        const {description, alert, fulldescription, address, image} = body;
        console.log(JSON.stringify(body));

        const maxIdResult = await pool.query('SELECT MAX(id) as max_id FROM program');
        const maxId = maxIdResult.rows[0].max_id || 0;
        const newId = maxId + 1;

        const resultados = await pool.query(`
            INSERT INTO program (id, description, alert, fulldescription, address, image)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id, description, alert, fulldescription, address, image`,
            [newId, description, alert, fulldescription, address, image]);

        const program = resultados.rows[0];
        return new Program(program.id, program.description, program.alert, program.fulldescription, program.address, program.image);

    } catch(err) {
        throw "Erro ao inserir program " + err;
    }
}



const updateProgramDB = async (body) => {
    console.log(JSON.stringify(body));
    try{
        const {id,description,alert,fulldescription,address,image} = body;
        const resultados = await pool.query(`UPDATE 
        program SET 
        id= $1, description = $2,alert= $3,fulldescription=$4,address = $5,image = $6
         WHERE 
         id= $1 
         returning
         id,description,alert,fulldescription,address,image`,
          [id,description,alert,fulldescription,address,image]);
        if(resultados.rowCount === 0){
            throw `Nenhum registro encontrado com o código ${id} para ser alaterado`;
        }
        const program = resultados.rows[0];
        return  new Program(program.id, program.description, program.alert, program.fulldescription, program.address, program.image);

    }catch(err){
        throw "Erro ao alterar programa" + err;
    }
}

const deleteProgramDB = async (id) => {
    try{
        const resultados = await pool.query(`DELETE FROM program WHERE id = $1`,[id]);
        if(resultados.rowCount === 0){
            throw `Nenhum registro encontrado com o código ${id} para ser removido`;
        }else {
            return "Programa removida com sucesso";
        }
    }catch(err){
        throw "Erro ao remover produto  " + err;
    }
}

const getProgramForIdDB = async (id) => {
    try{
        const resultados = await pool.query(`SELECT *  FROM  program WHERE id = $1`,[id]);
        if(resultados.rowCount === 0){
            throw `Nenhum registro encontrado com o código ${id} `;
        }else {
            const program = resultados.rows[0];
            return new Program(program.id, program.description, program.alert, program.fulldescription, program.address, program.image);
        }
    }catch(err){
        throw "Erro ao alterar o programs   " + err;
    }
}

module.exports = {
    getProgramsDB,
    addProgramDB,
    updateProgramDB,
    deleteProgramDB,
    getProgramForIdDB
}
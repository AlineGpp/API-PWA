const { pool } = require("../config");
const Program = require("../entities/program");

const getProgramsDB = async () => {
  try {
    const { rows } = await pool.query(
      `SELECT * FROM program ORDER BY description`
    );
    return rows.map(
      (program) => new Program(program.id, program.description, program.address)
    );
  } catch (err) {
    throw "Erro " + err;
  }
};

const addProgramDB = async (body) => {
  try {
    const { description, address } = body;
    console.log(JSON.stringify(body));

    const maxIdResult = await pool.query(
      "SELECT MAX(id) as max_id FROM program"
    );
    const maxId = maxIdResult.rows[0].max_id || 0;
    const newId = maxId + 1;
    
    const resultados = await pool.query(
      `
            INSERT INTO program (id, description,address)
            VALUES ($1, $2, $3)
            RETURNING id, description, address`,
      [newId, description, address]
    );

    const program = resultados.rows[0];
    return new Program(program.id, program.description, program.address);
  } catch (err) {
    throw "Erro ao inserir program " + err;
  }
};

const updateProgramDB = async (body) => {
  console.log(JSON.stringify(body));
  try {
    const { id, description, address } = body;
    const resultados = await pool.query(
      `UPDATE 
        program SET 
        id= $1, description = $2,address= $3
         WHERE 
         id= $1 
         returning
         id,description,address`,
      [id, description, address]
    );
    if (resultados.rowCount === 0) {
      throw `Nenhum registro encontrado com o código ${id} para ser alterado`;
    }
    const program = resultados.rows[0];
    return new Program(program.id, program.description, program.address);
  } catch (err) {
    throw "Erro ao alterar programa" + err;
  }
};

const deleteProgramDB = async (id) => {
  try {
    const resultados = await pool.query(`DELETE FROM program WHERE id = $1`, [
      id,
    ]);
    if (resultados.rowCount === 0) {
      throw `Nenhum registro encontrado com o código ${id} para ser removido`;
    } else {
      return "Programa removida com sucesso";
    }
  } catch (err) {
    throw "Erro ao remover produto  " + err;
  }
};

const getProgramForIdDB = async (id) => {
  try {
    const resultados = await pool.query(
      `SELECT *  FROM  program WHERE id = $1`,
      [id]
    );
    if (resultados.rowCount === 0) {
      throw `Nenhum registro encontrado com o código ${id} `;
    } else {
      const program = resultados.rows[0];
      return new Program(program.id, program.description, program.address);
    }
  } catch (err) {
    throw "Erro ao alterar o programs   " + err;
  }
};

module.exports = {
  getProgramsDB,
  addProgramDB,
  updateProgramDB,
  deleteProgramDB,
  getProgramForIdDB,
};

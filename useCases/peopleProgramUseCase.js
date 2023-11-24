const { pool } = require("../config");
const PeopleProgram = require("../entities/people_program");
const getPeopleProgramDB = async () => {
  try {
    const { rows } = await pool.query(`
            SELECT people_program.id as id ,pe.name as people_name,pm.description as program_name,
            people_program.people_id as people_id,people_program.program_id as program_id
            FROM people_program
            INNER JOIN people pe ON people_program.people_id = pe.id
            INNER JOIN program pm ON people_program.program_id = pm.id
             `);
    // console.log(rows);
    return rows.map(
      (peopleprogram) =>
        new PeopleProgram(
          peopleprogram.id,
          peopleprogram.program_name,
          peopleprogram.people_name,
          peopleprogram.people_id,
          peopleprogram.program_id
        )
    );
  } catch (err) {
    throw "Erro " + err;
  }
};

const addPeopleProgramDB = async (body) => {
  try {
    const { people_id,program_id } = body;
    const result = await pool.query(
      `INSERT INTO people_program (people_id,program_id) VALUES ($1,$2) RETURNING id,people_id,program_id`,
      [people_id, program_id]
    );
    const people_program = result.rows;
    return people_program.map(
      (peopleprogram) =>
        new PeopleProgram(
          peopleprogram.id,
          peopleprogram.people_id,
          peopleprogram.program_id,
           peopleprogram.program_name,
          peopleprogram.people_name
        )
    );
  } catch (err) {
    throw "Erro " + err;
  }
};

const updatePeopleProgramDB = async (body) => {
  try {
    const { id, people_id, program_id } = body;
    const results = await pool.query(
      `UPDATE people_program
      SET people_id=$2, program_id=$3
      WHERE id = $1 returning id,people_id,program_id `,
      [id, people_id, program_id]
    );
    if (results.rowCount == 0) {
      throw `Nenhum registro encontrado com o código ${id} para 
          ser alterado`;
    }
    const people_program = results.rows[0];
    return new PeopleProgram(
      people_program.id,
      people_program.program_name,
      people_program.people_name,
      people_program.people_id,
      people_program.program_id
    );
  } catch (err) {
    throw "Erro ao alterar o people e program : " + err;
  }
};

const deletePeopleProgramDB = async (id) => {
  try {
    const results = await pool.query(
      `DELETE FROM people_program where id = $1`,
      [id]
    );
    if (results.rowCount == 0) {
      throw `Nenhum registro encontrado com o ID ${id} para ser removido`;
    } else {
      return "Programa removido de Pessoa  com sucesso";
    }
  } catch (err) {
    throw "Erro ao remover a programa: " + err;
  }
};

const getPeopleProgramCodigoDB = async (codigo) => {
  try {
    const results = await pool.query(
      ` 
        SELECT people_program.id as id ,pe.name as people_name,pm.description as program_name,
            people_program.people_id as people_id,people_program.program_id as program_id
            FROM people_program
            INNER JOIN people pe ON people_program.people_id = pe.id
            INNER JOIN program pm ON people_program.program_id = pm.id
        WHERE people_program.id = $1`,
      [codigo]
    );
    if (results.rowCount == 0) {
      throw `Nenhum registro encontrado com o código ${codigo}`;
    } else {
      const peopleprogram = results.rows[0];
      return new PeopleProgram(
        peopleprogram.id,
        peopleprogram.program_name,
        peopleprogram.people_name,
        peopleprogram.people_id,
        peopleprogram.program_id
      )
    }
  } catch (err) {
    throw "Erro ao recuperar o people program : " + err;
  }
};

module.exports = {
  getPeopleProgramDB,
  addPeopleProgramDB,
  updatePeopleProgramDB,
  deletePeopleProgramDB,
  getPeopleProgramCodigoDB,
};

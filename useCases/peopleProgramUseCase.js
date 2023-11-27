const { pool } = require("../config");
const PeopleProgram = require("../entities/people_program");

const getPeopleProgramDB = async () => {
  try {
    const { rows } = await pool.query(`
            SELECT pe.name as people_name,
            pm.description as program_name,
            people_program.people as people,
            people_program.program as program
            FROM people_program
            INNER JOIN people pe ON people_program.people = pe.id
            INNER JOIN program pm ON people_program.program = pm.id
             `);
    // console.log(rows);
    return rows.map(
      (peopleprogram) =>
        new PeopleProgram(
          peopleprogram.people,
          peopleprogram.program,
          peopleprogram.program_name,
          peopleprogram.people_name
        )
    );
  } catch (err) {
    throw "Erro " + err;
  }
};

const addPeopleProgramDB = async (body) => {
  try {
    const { people,program} = body;
    
    const results = await pool.query(
      `INSERT INTO people_program (people,program) VALUES ($1,$2) RETURNING people,program`,
      [people, program]
    );
    console.log(results.rows)

    const peopleprogram  = results.rows[0];
    return new PeopleProgram(
      peopleprogram.people,
      peopleprogram.program,
      peopleprogram.people_name,
      peopleprogram.program_name

    );
   
  } catch (err) {
    throw "Erro " + err;
  }
};

// const updatePeopleProgramDB = async (body) => {
//   try {
//     const { id, people_id, program_id } = body;
//     const results = await pool.query(
//       `UPDATE people_program
//       SET people_id=$2, program_id=$3
//       WHERE id = $1 returning id,people_id,program_id `,
//       [id, people_id, program_id]
//     );
//     if (results.rowCount == 0) {
//       throw `Nenhum registro encontrado com o código ${id} para 
//           ser alterado`;
//     }
//     const people_program = results.rows[0];
//     return new PeopleProgram(
//       people_program.id,
//       people_program.program_name,
//       people_program.people_name,
//       people_program.people_id,
//       people_program.program_id
//     );
//   } catch (err) {
//     throw "Erro ao alterar o people e program : " + err;
//   }
// };

const deletePeopleProgramDB = async (idPeo,idPro) => {
  console.log(idPeo,idPro)
  try {
    const results = await pool.query(
      `DELETE FROM people_program WHERE  people = $1 AND program = $2`,
      [idPeo,idPro]
    );
    if (results.rowCount == 0) {
      throw `Nenhum registro encontrado com o IDPessoa ${idPeo} e IDProgrma ${idPro} para ser removido`;
    } else {
      return "Programa removido de Pessoa  com sucesso";
    }
  } catch (err) {
    throw "Erro ao remover a pessoa e  programa: " + err;
  }
};

const getPeopleProgramCodigoDB = async (idPeo,idPro) => {
  try {
    const results = await pool.query(
      `  SELECT pe.name as people_name,
      pm.description as program_name,
      people_program.people as people,
      people_program.program as program
      FROM people_program
      INNER JOIN people pe ON people_program.people = pe.id
      INNER JOIN program pm ON people_program.program = pm.id
        WHERE people_program.people = $1 AND people_program.program = $2`,
      [idPeo,idPro]
    );
    if (results.rowCount == 0) {
      throw `Nenhum registro encontrado com o código ${codigo}`;
    } else {
      const peopleprogram = results.rows[0];
      return new PeopleProgram(
        // peopleprogram.id,
        peopleprogram.people,
        peopleprogram.program,
        peopleprogram.program_name,
        peopleprogram.people_name
      )
    }
  } catch (err) {
    throw "Erro ao recuperar o people program : " + err;
  }
};

module.exports = {
  getPeopleProgramDB,
  addPeopleProgramDB,
  deletePeopleProgramDB,
  getPeopleProgramCodigoDB,
};

const { pool } = require("../config");
const People = require("../entities/people");

const getPeoplesDB = async () => {
  try {
    const { rows } = await pool.query("SELECT * FROM people order by name");
    return rows.map(
      (people) =>
        new People(
          people.id,
          people.name,
          people.e_mail,
          people.login,
          people.password
        )
    );
  } catch (err) {
    throw "Erro : " + err;
  }
};

const addPeopleDB = async (body) => {
  try {
    const { name, e_mail, login, password } = body;
    const maxIdResult = await pool.query(
      "SELECT MAX(id) as max_id FROM people"
    );
    const maxId = maxIdResult.rows[0].max_id || 0;
    const newId = maxId + 1;

    console.log("New ID: " + newId);

    const results = await pool.query(
      `
            INSERT INTO people (id,name,e_mail,login, password) 
            VALUES ($1, $2, $3, $4,$5)
            RETURNING id, name,e_mail, login, password`,
      [newId, name, e_mail, login, password]
    );

    const people = results.rows[0];
    return new People(
      people.id,
      people.name,
      people.e_mail,
      people.login,
      people.password
    );
  } catch (err) {
    throw "Erro ao inserir a pessoa: " + err;
  }
};

const updatePeopleDB = async (body) => {
  console.log(JSON.stringify(body));
  try {
    const { id, name, e_mail, login, password } = body;
    const results = await pool.query(
      `UPDATE people SET id = $1, name = $2,  e_mail = $3, login = $4, password = $5
       WHERE id = $1
        RETURNING id, name, e_mail, login, password`,
      [id, name, e_mail, login, password]
    );
    if (results.rowCount == 0) {
      throw `Nenhum registro encontrado com o ID ${id} para ser alterado`;
    }
    const people = results.rows[0];
    return new People(
      people.id,
      people.name,
      people.e_mail,
      people.login,
      people.password
    );
  } catch (err) {
    throw "Erro ao alterar a pessoa: " + err;
  }
};

const deletePeopleDB = async (id) => {
  try {
    const results = await pool.query(`DELETE FROM people where id = $1`, [id]);
    if (results.rowCount == 0) {
      throw `Nenhum registro encontrado com o ID ${id} para ser removido`;
    } else {
      return "Pessoa removida com sucesso";
    }
  } catch (err) {
    throw "Erro ao remover a pessoa: " + err;
  }
};

const getPeoplePorCodigoDB = async (id) => {
  try {
    const results = await pool.query(`SELECT * FROM people where id = $1`, [
      id,
    ]);
    if (results.rowCount == 0) {
      throw "Nenhum registro encontrado com o ID: " + id;
    } else {
      const people = results.rows[0];
      return new People(
        people.id,
        people.name,
        people.e_mail,
        people.login,
        people.password
      );
    }
  } catch (err) {
    throw "Erro ao recuperar a pessoa: " + err;
  }
};

module.exports = {
  getPeoplesDB,
  addPeopleDB,
  updatePeopleDB,
  deletePeopleDB,
  getPeoplePorCodigoDB,
};

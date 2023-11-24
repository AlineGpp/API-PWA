const { Router } = require("express");
const { verificaJWT } = require("../controllers/securityController");

const {
  getPeoples,
  addPeople,
  updatePeople,
  deletePeople,
  getPeoplePorID,
} = require("../controllers/peopleController");

const routesPeoples = new Router();

routesPeoples
  .route("/people")
  .get(verificaJWT,getPeoples)
  .post(verificaJWT,addPeople)
  .put(verificaJWT,updatePeople);

routesPeoples.route("/people/:id").get(verificaJWT,getPeoplePorID).delete(verificaJWT,deletePeople);

module.exports =  routesPeoples ;

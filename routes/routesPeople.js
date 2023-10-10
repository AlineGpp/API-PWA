const { Router } = require("express");

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
  .get(getPeoples)
  .post(addPeople)
  .put(updatePeople);

routesPeoples.route("/people/:id").get(getPeoplePorID).delete(deletePeople);

module.exports =  routesPeoples ;

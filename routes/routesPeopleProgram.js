const { Router } = require('express');
const {addPeopleProgram,getPeopleProgram,deletePeopleProgram,updatePeopleProgram,getPeopleProgramCodigo} = require('../controllers/people_programController');
const { verificaJWT } = require("../controllers/securityController");
const routesPeopleProgram = new Router();

routesPeopleProgram.route('/people_program')
    .get(verificaJWT,getPeopleProgram)
    .post(verificaJWT,addPeopleProgram)
    .put(verificaJWT,updatePeopleProgram);

routesPeopleProgram.route('/people_program/:id')
    .delete(verificaJWT,deletePeopleProgram)
    .get(verificaJWT,getPeopleProgramCodigo);


module.exports =  routesPeopleProgram ;
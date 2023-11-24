const {Router} = require('express');
const {addProgram,deleteProgram,getProgram,getProgramForCodigo,updateProgram} = require('../controllers/programController');
const { verificaJWT } = require("../controllers/securityController");
const routesProgram = new Router();

routesProgram.route('/program')
    .get(verificaJWT,getProgram)
    .post(verificaJWT,addProgram)
    .put(updateProgram)

    routesProgram.route('/program/:id')
    .delete(verificaJWT,deleteProgram)
    .get(verificaJWT,getProgramForCodigo)

module.exports = routesProgram;

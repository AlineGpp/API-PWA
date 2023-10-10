const {Router} = require('express');
const {addProgram,deleteProgram,getProgram,getProgramForCodigo,updateProgram} = require('../controllers/programController');

const routesProgram = new Router();

routesProgram.route('/program')
    .get(getProgram)
    .post(addProgram)
    .put(updateProgram)

    routesProgram.route('/program/:id')
    .delete(deleteProgram)
    .get(getProgramForCodigo)




module.exports = routesProgram;

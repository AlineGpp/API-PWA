const { Router } = require('express');
const {addPeopleProgram,getPeopleProgram} = require('../controllers/people_programController');

const routesPeopleProgram = new Router();

routesPeopleProgram.route('/people_program')
    .get(getPeopleProgram)
    .post(addPeopleProgram)

module.exports =  routesPeopleProgram ;
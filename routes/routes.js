const {Router} = require('express');
const routesProgram = require('./routesProgram');
const routesPeople = require('./routesPeople');
const routesPeopleProgram = require('./routesPeopleProgram');
const {login } = require('../controllers/securityController');
const routes = new Router();

routes.post('/login', login);
routes.use(routesProgram);
routes.use(routesPeople);
routes.use(routesPeopleProgram);


module.exports = routes;
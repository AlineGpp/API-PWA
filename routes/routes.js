const {Router} = require('express');
const {routesProgram} = require('./routesProgram');
const {routesPeoples} = require('../routes/routesPeople');
const {routesPeopleProgram} = require('../routes/routesPeopleProgram');
const routes = new Router();

routes.use(routesProgram);
routes.use(routesPeoples);
routes.use(routesPeopleProgram);


module.exports = routes;
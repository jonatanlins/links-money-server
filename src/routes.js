const express = require('express');

const PageController = require('./controllers/PageController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.get('/pages', PageController.index);
routes.get('/pages/:id', PageController.show);
routes.post('/pages', PageController.create);
routes.put('/pages', PageController.update);

routes.get('/sessions', SessionController.index);
routes.post('/sessions', SessionController.create);

module.exports = routes;

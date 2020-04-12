'use strict';

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.get('/', () => ({ status: 'working', version: '0.0.0' }));

Route.post('/sessions', 'SessionController.create');
Route.post('/users', 'UserController.create');

Route.group(() => {
  Route.resource('pages', 'PageController').apiOnly();

  Route.resource('links', 'PageController').apiOnly();

  Route.resource('social-buttons', 'PageController').apiOnly();

  Route.resource('social-integrations', 'PageController').apiOnly();
}).middleware('auth');

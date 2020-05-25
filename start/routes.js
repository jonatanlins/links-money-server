'use strict';

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.get('/', () => ({ status: 'working', version: '0.0.0' }));

Route.post('/sessions', 'SessionController.store');
Route.post('/users', 'UserController.store');

Route.resource('pages', 'PageController').apiOnly();

Route.group(() => {
  Route.resource('posts', 'PostController').apiOnly();

  Route.resource('social-buttons', 'SocialButtonController').apiOnly();

  Route.resource(
    'social-integrations',
    'SocialIntegrationController'
  ).apiOnly();
}).middleware('auth');

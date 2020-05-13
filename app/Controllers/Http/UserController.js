'use strict';

const User = use('App/Models/User');

class UserController {
  async store({ request, auth }) {
    const data = request.only(['name', 'email', 'password']);

    const user = await User.create(data);

    const session = await auth.attempt(data.email, data.password);

    return { user, session };
  }
}

module.exports = UserController;

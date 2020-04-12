'use strict';

const User = use('App/Models/User');

class SessionController {
  async store({ request, auth }) {
    const { email, password } = request.all();

    const session = await auth.attempt(email, password);
    const user = await User.query().where('email', email).first();

    return { user, session };
  }
}

module.exports = SessionController;

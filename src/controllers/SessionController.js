const db = require('../database/connection');

module.exports = {
  async index(request, response) {
    const users = await db('users').select('*');

    return response.send(users);
  },

  async create(request, response) {
    const { email, password, name, pages } = request.body;

    const [id] = await db('users').insert({
      email,
      password,
      name,
      pages: JSON.stringify(pages),
    });

    return response.send({ id });
  },
};

const db = require('../database/connection');

module.exports = {
  async index(request, response) {
    const pages = await db('pages').select(
      'id',
      'name',
      'avatar',
      'description',
      'socialButtons',
      'mosaic'
    );

    const formattedPages = pages.map(page => page);

    return response.send(formattedPages);
  },

  async show(request, response) {
    const { id } = request.params;

    const page = await db('pages')
      .where('id', id)
      .select('id', 'name', 'avatar', 'description', 'socialButtons', 'mosaic')
      .first();

    const formattedPage = {
      ...page,
      socialButtons: JSON.parse(page.socialButtons),
      mosaic: JSON.parse(page.mosaic),
    };

    return response.send(formattedPage);
  },

  async create(request, response) {
    const {
      id,
      name,
      avatar,
      description,
      socialButtons,
      mosaic,
    } = request.body;

    const formattedPage = {
      id,
      name,
      avatar,
      description,
      socialButtons: JSON.stringify(socialButtons),
      mosaic: JSON.stringify(mosaic),
    };

    await db('pages').insert(formattedPage);

    return response.send({ id });
  },

  async update(request, response) {},
};

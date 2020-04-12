'use strict';

const Link = use('App/Models/Link');

class LinkController {
  async index() {
    const links = await Link.all();

    return links;
  }

  async store({ request }) {
    const data = request.only(['type', 'thumbnail', 'link', 'page_id']);

    const link = await Link.create(data);

    return link;
  }

  async show({ params }) {
    const link = await Link.findOrFail(params.id);

    return link;
  }

  async update({ params, request }) {
    const link = await Link.findOrFail(params.id);

    const data = request.only(['type', 'thumbnail', 'link', 'page_id']);
    link.merge(data);
    await link.save();

    return link;
  }

  async destroy({ params }) {
    const link = await Link.findOrFail(params.id);

    await link.delete();
  }
}

module.exports = LinkController;

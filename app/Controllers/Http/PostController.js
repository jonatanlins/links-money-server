'use strict';

const Post = use('App/Models/Link');

class LinkController {
  async index() {
    const links = await Post.all();

    return links;
  }

  async store({ request }) {
    const data = request.only(['type', 'social_id', 'link', 'page_id']);

    const link = await Post.create(data);

    return link;
  }

  async show({ params }) {
    const link = await Post.findOrFail(params.id);

    return link;
  }

  async update({ params, request }) {
    const link = await Post.findOrFail(params.id);

    const data = request.only(['type', 'social_id', 'link', 'page_id']);
    link.merge(data);
    await link.save();

    return link;
  }

  async destroy({ params }) {
    const link = await Post.findOrFail(params.id);

    await link.delete();
  }
}

module.exports = LinkController;
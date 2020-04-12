'use strict';

const Page = use('App/Models/Page');

class PageController {
  async index() {
    const pages = await Page.query()
      .with('owners')
      .with('socialButtons')
      .with('links')
      .with('socialIntegrations')
      .fetch();

    return pages;
  }

  async store({ request }) {
    const data = request.only(['id', 'name', 'avatar', 'description']);
    const { owners } = request.all();

    const page = await Page.create(data);

    if (owners && owners.length) {
      await page.owners().attach(owners);
      page.owners = await page.owners().fetch();
    }

    return page;
  }

  async show({ params }) {
    const page = await Page.query()
      .where('id', params.id)
      .with('owners')
      .with('socialButtons')
      .with('links')
      .with('socialIntegrations')
      .first();

    return page;
  }

  async update({ params, request }) {
    const page = await Page.findOrFail(params.id);

    const data = request.only(['name', 'avatar', 'description']);
    const { owners } = request.all();

    page.merge(data);
    await page.save();

    if (owners && owners.length) {
      await page.owners().detach();
      await page.owners().attach(owners);
      page.owners = await page.owners().fetch();
    }

    return page;
  }

  async destroy({ params }) {
    const page = await Page.findOrFail(params.id);

    await page.delete();
  }
}

module.exports = PageController;

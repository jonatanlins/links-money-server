'use strict';

const SocialButton = use('App/Models/SocialButton');

class SocialButtonController {
  async index() {
    const socialButtons = await SocialButton.all();

    return socialButtons;
  }

  async store({ request }) {
    const data = request.only([
      'label',
      'icon',
      'color',
      'gradient',
      'link',
      'layout',
      'page_id',
    ]);

    const socialButton = await SocialButton.create(data);

    return socialButton;
  }

  async show({ params }) {
    const socialButton = await SocialButton.findOrFail(params.id);

    return socialButton;
  }

  async update({ params, request }) {
    const socialButton = await SocialButton.findOrFail(params.id);

    const data = request.only([
      'label',
      'icon',
      'color',
      'gradient',
      'link',
      'layout',
      'page_id',
    ]);
    socialButton.merge(data);
    await socialButton.save();

    return socialButton;
  }

  async destroy({ params }) {
    const socialButton = await SocialButton.findOrFail(params.id);

    await socialButton.delete();
  }
}

module.exports = SocialButtonController;

'use strict';

const SocialIntegration = use('App/Models/SocialIntegration');

class SocialIntegrationController {
  async index() {
    const socialIntegrations = await SocialIntegration.all();

    return socialIntegrations;
  }

  async store({ request }) {
    const data = request.only(['type', 'social_id', 'page_id']);

    const socialIntegration = await SocialIntegration.create(data);

    return socialIntegration;
  }

  async show({ params }) {
    const socialIntegration = await SocialIntegration.findOrFail(params.id);

    return socialIntegration;
  }

  async update({ params, request }) {
    const socialIntegration = await SocialIntegration.findOrFail(params.id);

    const data = request.only(['type', 'social_id', 'page_id']);
    socialIntegration.merge(data);
    await socialIntegration.save();

    return socialIntegration;
  }

  async destroy({ params }) {
    const socialIntegration = await SocialIntegration.findOrFail(params.id);

    await socialIntegration.delete();
  }
}

module.exports = SocialIntegrationController;

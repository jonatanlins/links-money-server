'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class SocialIntegration extends Model {
  page() {
    return this.belongsTo('App/Models/Page');
  }
}

module.exports = SocialIntegration;

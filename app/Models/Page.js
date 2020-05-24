'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Page extends Model {
  owners() {
    return this.belongsToMany('App/Models/User').pivotTable('pivot_user_page');
  }

  socialButtons() {
    return this.hasMany('App/Models/SocialButton');
  }

  posts() {
    return this.hasMany('App/Models/Post');
  }
}

module.exports = Page;

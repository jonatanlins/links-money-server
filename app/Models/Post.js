'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Post extends Model {
  page() {
    return this.belongsTo('App/Models/Page');
  }
}

module.exports = Post;

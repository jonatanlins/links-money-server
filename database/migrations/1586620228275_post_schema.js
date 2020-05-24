'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class LinkSchema extends Schema {
  up() {
    this.create('posts', (table) => {
      table.increments();

      table.string('post_id', 30).notNullable().unique();
      table.string('caption', 300);
      table.string('media_type', 20).notNullable();
      table.string('media_url', 300).notNullable();
      table.string('permalink', 100).notNullable();

      table
        .integer('page_id')
        .unsigned()
        .references('id')
        .inTable('pages')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');

      table.timestamps();
    });
  }

  down() {
    this.drop('posts');
  }
}

module.exports = LinkSchema;

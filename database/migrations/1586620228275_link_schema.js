'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class LinkSchema extends Schema {
  up() {
    this.create('links', (table) => {
      table.string('id', 30).notNullable().unique();
      table.string('caption', 300);
      table.string('media_type', 20).notNullable();
      table.string('media_url', 300).notNullable();
      table.string('permalink', 100).notNullable();

      table
        .string('page_id', 40)
        .notNullable()
        .references('id')
        .inTable('pages')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');

      table.timestamps();
    });
  }

  down() {
    this.drop('links');
  }
}

module.exports = LinkSchema;

'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class LinkSchema extends Schema {
  up() {
    this.create('links', (table) => {
      table.increments();

      table.string('thumbnail', 250).notNullable();
      table.string('link', 250).notNullable();
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

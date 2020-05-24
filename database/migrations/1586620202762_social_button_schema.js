'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class SocialButtonSchema extends Schema {
  up() {
    this.create('social_buttons', (table) => {
      table.increments();

      table.string('label', 40).notNullable();
      table.string('icon', 30);
      table.string('color', 7).notNullable();
      table.string('gradient', 140);
      table.string('link', 300).notNullable();
      table.string('layout', 30);

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
    this.drop('social_buttons');
  }
}

module.exports = SocialButtonSchema;

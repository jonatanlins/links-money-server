'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class PageSchema extends Schema {
  up() {
    this.create('pages', (table) => {
      table.string('id', 40).notNullable().unique();
      table.string('name', 80).notNullable();
      table.string('avatar', 254).notNullable();
      table.string('description', 254).notNullable();

      table.timestamps();
    });
  }

  down() {
    this.drop('pages');
  }
}

module.exports = PageSchema;
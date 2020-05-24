'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class PageSchema extends Schema {
  up() {
    this.create('pages', (table) => {
      table.increments();

      table.string('username', 40).notNullable().unique();
      table.string('name', 80).notNullable();
      table.string('avatar', 300).notNullable();
      table.string('description', 300).notNullable();
      table.string('access_token', 200).notNullable();

      table.timestamps();
    });
  }

  down() {
    this.drop('pages');
  }
}

module.exports = PageSchema;

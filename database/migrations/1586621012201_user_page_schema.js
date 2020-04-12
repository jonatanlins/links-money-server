'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class UserPageSchema extends Schema {
  up() {
    this.create('pivot_user_page', (table) => {
      table.increments();

      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .string('page_id', 40)
        .notNullable()
        .references('id')
        .inTable('pages')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    });
  }

  down() {
    this.drop('pivot_user_page');
  }
}

module.exports = UserPageSchema;

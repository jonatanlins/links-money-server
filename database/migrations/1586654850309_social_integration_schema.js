'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class SocialIntegrationSchema extends Schema {
  up() {
    this.create('social_integrations', (table) => {
      table.increments();

      table.string('type', 20).notNullable();
      table.string('social_id', 60).notNullable();
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
    this.drop('social_integrations');
  }
}

module.exports = SocialIntegrationSchema;

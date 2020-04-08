exports.up = function(knex) {
  return knex.schema.createTable('pages', table => {
    table.timestamps();

    table
      .string('id')
      .notNullable()
      .unique();
    table.string('name').notNullable();
    table.string('avatar').notNullable();
    table.string('description').notNullable();
    table.string('socialButtons').notNullable();
    table.string('mosaic').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('pages');
};

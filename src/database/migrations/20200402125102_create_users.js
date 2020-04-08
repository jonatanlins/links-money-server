exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
    table.increments();
    table.timestamps();

    table
      .string('email')
      .notNullable()
      .unique();
    table.string('password').notNullable();
    table.string('name').notNullable();
    table.string('pages').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};

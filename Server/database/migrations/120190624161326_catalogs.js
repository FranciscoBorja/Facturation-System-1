exports.up = function (knex, Promise) {
    return knex.schema.withSchema('catalogs')
        .createTable('genders', function (table) {
            table.increments('id').primary();
            table.string('description').notNullable();
            table.timestamps(true, true);
        })
        .createTable('roles', function (table) {
            table.increments('id').primary();
            table.string('name', 10).notNullable();
            table.string('description').notNullable();
            table.timestamps(true, true);
        })
};


exports.down = function (knex, Promise) {
    return knex.schema.withSchema('catalogs')
        .dropTableIfExists('roles')
        .dropTableIfExists('genders')
};

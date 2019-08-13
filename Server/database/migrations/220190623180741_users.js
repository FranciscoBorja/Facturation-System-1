exports.up = function (knex, Promise) {
    return knex.schema.withSchema('persons').createTable('users', function (table) {
        table.increments('id').unsigned().primary();
        table.string('first_name').notNullable();
        table.string('last_name').notNullable();
        table.string('birth_date').notNullable();
        table.string('email').unique();
        table.string('password').notNullable();
        table.integer('gender_id').references('id').inTable('catalogs.genders').notNullable();
        table.string('nick_name');
        table.string('card');
        table.integer('role_id').references('id').inTable('catalogs.roles');
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.withSchema('persons')
        .dropTableIfExists('users');
};

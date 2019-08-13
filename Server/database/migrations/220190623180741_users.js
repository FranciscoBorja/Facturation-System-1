exports.up = function (knex, Promise) {
    return knex.schema.withSchema('persons').createTable('users', function (table) {
        table.increments('id').unsigned().primary();
        table.string('first_name').notNullable();
        table.string('last_name').notNullable();
        table.string('address')
        table.string('email').unique();
        table.string('password')
        table.string('code_postal')
        table.integer('gender_id').references('id').inTable('catalogs.genders').notNullable();
        table.string('nif').notNullable()
        table.integer('typeUser_id').references('id').inTable('catalogs.users_type');
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.withSchema('persons')
        .dropTableIfExists('users');
};

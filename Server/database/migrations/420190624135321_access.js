exports.up = function (knex, Promise) {
    return knex.schema.withSchema('access').createTable('sessions', function (table) {
        table.increments('id').unsigned().primary();
        table.string('token').notNullable().unique();
        table.integer('user_id').references('id').inTable('persons.users').notNullable();
        table.timestamps(true, true);
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.withSchema('access')
        .dropTableIfExists('sessions')

};

exports.up = function (knex, Promise) {
    return knex.schema.withSchema('corporations')
        .createTable('enterprises', function (table) {
            table.increments('id').unsigned().primary();
            table.string('name').notNullable();
            table.string('ruc').notNullable();
            table.string('phone').unique();
            table.string('corporation_email').notNullable();
            table.string('address').notNullable();
            table.binary('logo').notNullable();
            table.timestamps(true, true);
        })
        .createTable('services', function (table) {
            table.increments('id').unsigned().primary();
            table.string('name').notNullable();
            table.string('description').notNullable();
            table.binary('image');
            table.string('imageType');
            table.timestamps(true, true);
        })
        .createTable('sub_services', function (table) {
            table.increments('id').unsigned().primary();
            table.string('name').notNullable();
            table.float('duration').notNullable();
            table.float('price').notNullable();
            table.integer('service_id').references('id').inTable('corporations.services').notNullable();
            table.timestamps(true, true);

        })


};

exports.down = function (knex, Promise) {
    return knex.schema.withSchema('corporations')
        .dropTableIfExists('enterprises')
        .dropTableIfExists('sub_services')
        .dropTableIfExists('services');
};


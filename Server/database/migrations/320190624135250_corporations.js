exports.up = function (knex, Promise) {
    return knex.schema.withSchema('corporations')
        .createTable('type_products', function (table) {
            table.increments('id').unsigned().primary();
            table.string('name').notNullable();
            table.string('description').notNullable();
            table.timestamps(true, true);
        })
        .createTable('wineries', function (table) {
            table.increments('id').unsigned().primary();
            table.string('description').notNullable();
            table.timestamps(true, true);
        })
        .createTable('products', function (table) {
            table.increments('id').unsigned().primary();
            table.string('name').notNullable();
            table.float('price_sell').notNullable();
            table.float('price_buy').notNullable();
            table.integer('type_products_id').references('id').inTable('corporations.type_products').notNullable();
            table.timestamps(true, true);

        })
        .createTable('productsXwineries', function (table) {
            table.increments('id').unsigned().primary();
            table.integer('products_id').references('id').inTable('corporations.products');
            table.integer('wineries_id').references('id').inTable('corporations.wineries');
            table.integer('quantityOfProducts').notNullable();
            table.timestamps(true, true);
        })


};

exports.down = function (knex, Promise) {
    return knex.schema.withSchema('corporations')
        .dropTableIfExists('type_products')
        .dropTableIfExists('products');
};


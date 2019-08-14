exports.up = function (knex, Promise) {
    return knex.schema.withSchema('processes')
        .createTable('sales_notes', function (table) {
            table.increments('id').unsigned().primary();
            table.integer('user_id').references('id').inTable('persons.users');
            table.integer('typeOfSell_id').references('id').inTable('catalogs.type_of_sell');
            table.string('state')
            table.timestamps(true, true);
        })
        .createTable('claims', function (table) {
            table.increments('id').unsigned().primary();
            table.string('description')
            table.integer('sales_notes_id').references('id').inTable('processes.sales_notes');
            table.string('state');
            table.timestamps(true, true);
        })
        .createTable('productsXsales_notes', function (table) {
            table.increments('id').unsigned().primary();
            table.integer('quantityXproduct')
            table.integer('totalPay')
            table.integer('products_id').references('id').inTable(('corporations.products'));
            table.integer('sales_notes_id').references('id').inTable(('processes.sales_notes'));
            table.timestamps(true, true);
        })

};

exports.down = function (knex, Promise) {
    return knex.schema.withSchema('processes')
        .dropTableIfExists('claims')
        .dropTableIfExists('orders')
};

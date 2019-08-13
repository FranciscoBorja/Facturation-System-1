exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('catalogs.type_of_sell').del()
        .then(function () {
            // Inserts seed entries
            return knex('catalogs.type_of_sell').insert([
                {id: 1, name: 'invoices', description: 'Services invoices type'},
                {id: 2, name: 'orders', description: 'Services orders type'}
            ]);
        });
};

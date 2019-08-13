exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('catalogs.roles').del()
        .then(function () {
            // Inserts seed entries
            return knex('catalogs.roles').insert([
                {id: 1, name: 'Operator', description: 'Services client type'},
                {id: 2, name: 'Employee', description: 'Services employee type'},
                {id: 3, name: 'Admin', description: 'Services administrator type'}
            ]);
        });
};

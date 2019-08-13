exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('catalogs.users_type').del()
        .then(function () {
            // Inserts seed entries
            return knex('catalogs.users_type').insert([
                {id: 1, name: 'Client', description: 'Services client type'},
                {id: 2, name: 'Employee', description: 'Services employee type'},
                {id: 3, name: 'Admin', description: 'Services administrator type'},
                {id: 4, name: 'Provider', description: 'Services provider type'}
            ]);
        });
};

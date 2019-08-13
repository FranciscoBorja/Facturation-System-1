exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('catalogs.genders').del()
        .then(function () {
            // Inserts seed entries
            return knex('catalogs.genders').insert([
                {id: 1, description: 'Masculino'},
                {id: 2, description: 'Femenino'},
            ]);
        });

};

exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('persons.users').del()
        .then(function () {
            // Inserts seed entries
            return knex('persons.users').insert([
                {
                    first_name: 'Super',
                    last_name: 'Admin',
                    email: 'admin@hotmail.com',
                    password: '827CCB0EEA8A706C4C34A16891F84E7B',
                    gender_id: 1,
                    nif:'154737358',
                    phone:'0987537358',
                    typeUser_id: 3,
                },

            ]);
        });
};

exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('persons.users').del()
        .then(function () {
            // Inserts seed entries
            return knex('persons.users').insert([
                {
                    first_name: 'Super',
                    last_name: 'Admin',
                    birth_date: '9/07/1997',
                    email: 'superadmin@hotmail.com',
                    password: 'SuperAdmin',
                    gender_id: 1,
                    role_id: 3,
                },

            ]);
        });
};

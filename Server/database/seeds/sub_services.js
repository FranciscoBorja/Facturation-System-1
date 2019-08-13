exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('corporations.sub_services').del()
        .then(function () {
            // Inserts seed entries
            return knex('corporations.sub_services').insert([
                {name: 'Corte de Dama', duration: 0.3, price: 12, service_id: 2},
                {name: 'Corte de Caballero', duration: 0.3, price: 12, service_id: 2},
                {name: 'Hidratacion', duration: 2, price: 12, service_id: 1},
                {name: 'Tinte', duration: 2.45, price: 12, service_id: 1},
            ]);
        });
};

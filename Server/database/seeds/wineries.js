
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('corporations.wineries').del()
    .then(function () {
      // Inserts seed entries
      return knex('corporations.wineries').insert([
        {id: 1, description: 'Bodega1'}
      ]);
    });
};

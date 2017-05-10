exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE foods RESTART IDENTITY CASCADE')
    .then(() => {
      return Promise.all([
        knex.raw(
          'INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)',
          ['burrito', 700, new Date]
        ),
        knex.raw(
          'INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)',
          ['corn nuts', 450, new Date]
        ),
        knex.raw(
          'INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)',
          ['salsa', 2, new Date]
        )
      ])
    })
};

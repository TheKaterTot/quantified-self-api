
exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE categories RESTART IDENTITY CASCADE')
    .then(() => {
      return Promise.all([
        knex.raw(
          'INSERT INTO categories (name, created_at) VALUES (?, ?)',
          ["breakfast", new Date]
        ),
        knex.raw(
          'INSERT INTO categories (name, created_at) VALUES (?, ?)',
          ["lunch", new Date]
        ),
        knex.raw(
          'INSERT INTO categories (name, created_at) VALUES (?, ?)',
          ["dinner", new Date]
        ),
        knex.raw(
          'INSERT INTO categories (name, created_at) VALUES (?, ?)',
          ["snacks", new Date]
        ),
      ])
    })
};

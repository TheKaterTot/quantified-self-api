
exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE categories RESTART IDENTITY CASCADE')
    .then(() => {
      return Promise.all([
        knex.raw(
          'INSERT INTO categories (name, created_at) VALUES (?, ?)',
          ["Breakfast", new Date]
        ),
        knex.raw(
          'INSERT INTO categories (name, created_at) VALUES (?, ?)',
          ["Lunch", new Date]
        ),
        knex.raw(
          'INSERT INTO categories (name, created_at) VALUES (?, ?)',
          ["Dinner", new Date]
        ),
        knex.raw(
          'INSERT INTO categories (name, created_at) VALUES (?, ?)',
          ["Snacks", new Date]
        ),
      ])
    })
};

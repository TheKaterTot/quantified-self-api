exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE meals RESTART IDENTITY')
    .then(() => {
      return Promise.all([
        knex.raw(
          'INSERT INTO meals (date, category_id, food_id, created_at) VALUES (?, ?, ?, ?)',
          [new Date(2017, 04, 11), 1, 3, new Date]
        ),
        knex.raw(
          'INSERT INTO meals (date, category_id, food_id, created_at) VALUES (?, ?, ?, ?)',
          [new Date(2017, 04, 11), 2, 3, new Date]
        ),
        knex.raw(
          'INSERT INTO meals (date, category_id, food_id, created_at) VALUES (?, ?, ?, ?)',
          [new Date(2017, 04, 11), 3, 3, new Date]
        ),
        knex.raw(
          'INSERT INTO meals (date, category_id, food_id, created_at) VALUES (?, ?, ?, ?)',
          [new Date(2017, 04, 11), 4, 3, new Date]
        ),
        knex.raw(
          'INSERT INTO meals (date, category_id, food_id, created_at) VALUES (?, ?, ?, ?)',
          [new Date(2017, 04, 10), 1, 3, new Date]
        ),
        knex.raw(
          'INSERT INTO meals (date, category_id, food_id, created_at) VALUES (?, ?, ?, ?)',
          [new Date(2017, 04, 10), 2, 3, new Date]
        ),
        knex.raw(
          'INSERT INTO meals (date, category_id, food_id, created_at) VALUES (?, ?, ?, ?)',
          [new Date(2017, 04, 10), 3, 3, new Date]
        ),
        knex.raw(
          'INSERT INTO meals (date, category_id, food_id, created_at) VALUES (?, ?, ?, ?)',
          [new Date(2017, 04, 10), 4, 3, new Date]
        ),
        knex.raw(
          'INSERT INTO meals (date, category_id, food_id, created_at) VALUES (?, ?, ?, ?)',
          [new Date(2017, 04, 12), 1, 3, new Date]
        ),
        knex.raw(
          'INSERT INTO meals (date, category_id, food_id, created_at) VALUES (?, ?, ?, ?)',
          [new Date(2017, 04, 12), 2, 3, new Date]
        ),
        knex.raw(
          'INSERT INTO meals (date, category_id, food_id, created_at) VALUES (?, ?, ?, ?)',
          [new Date(2017, 04, 12), 3, 3, new Date]
        ),
        knex.raw(
          'INSERT INTO meals (date, category_id, food_id, created_at) VALUES (?, ?, ?, ?)',
          [new Date(2017, 04, 12), 4, 3, new Date]
        ),
        knex.raw(
          'INSERT INTO meals (date, category_id, food_id, created_at) VALUES (?, ?, ?, ?)',
          [new Date(2017, 04, 13), 1, 3, new Date]
        ),
        knex.raw(
          'INSERT INTO meals (date, category_id, food_id, created_at) VALUES (?, ?, ?, ?)',
          [new Date(2017, 04, 13), 2, 3, new Date]
        ),
        knex.raw(
          'INSERT INTO meals (date, category_id, food_id, created_at) VALUES (?, ?, ?, ?)',
          [new Date(2017, 04, 13), 3, 3, new Date]
        ),
        knex.raw(
          'INSERT INTO meals (date, category_id, food_id, created_at) VALUES (?, ?, ?, ?)',
          [new Date(2017, 04, 13), 4, 3, new Date]
        )
      ])
    })
};

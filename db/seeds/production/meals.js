exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE meals RESTART IDENTITY')
    .then(() => {
      return Promise.all([
        knex.raw(
          'INSERT INTO meals (date, category_id, food_id, created_at) VALUES (?, ?, ?, ?)',
          [new Date, 1, 3, new Date]
        ,
          'INSERT INTO meals (date, category_id, food_id, created_at) VALUES (?, ?, ?, ?)',
          [new Date, 2, 3, new Date]
        ,
          'INSERT INTO meals (date, category_id, food_id, created_at) VALUES (?, ?, ?, ?)',
          [new Date, 3, 3, new Date]
        ,
          'INSERT INTO meals (date, category_id, food_id, created_at) VALUES (?, ?, ?, ?)',
          [new Date, 4, 3, new Date]
        )
      ])
    })
};

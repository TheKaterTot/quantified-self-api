
exports.up = function(knex, Promise) {
  let createQuery = `CREATE TABLE meals(
    id SERIAL PRIMARY KEY NOT NULL,
    date DATE,
    category_id integer REFERENCES categories(id) on delete cascade on update cascade,
    food_id integer REFERENCES foods(id) on delete cascade on update cascade,
    created_at TIMESTAMP
  )`;
  return knex.raw(createQuery)
};

exports.down = function(knex, Promise) {
  let dropQuery = `DROP TABLE meals`;
  return knex.raw(dropQuery);
};

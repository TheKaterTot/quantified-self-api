
exports.up = function(knex, Promise) {
  let createQuery = `ALTER TABLE foods
  ADD status text DEFAULT 'active'
  `;
  return knex.raw(createQuery)
};

exports.down = function(knex, Promise) {
  let dropQuery = `ALTER TABLE foods
  DROP COLUMN status`;
  return knex.raw(dropQuery);
};

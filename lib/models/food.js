const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);

function all(){
  return database.raw('SELECT * FROM foods')
};

function create(req) {
  const food = req.body.food

  return database.raw('INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?) RETURNING id, name, calories',
  [food.name, food.calories, new Date])
}

module.exports = {
  all: all,
  create: create
};

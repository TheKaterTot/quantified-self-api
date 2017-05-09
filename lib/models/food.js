const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);

function all(){
  return database.raw('SELECT * FROM foods')
};

function create(req) {
  return new Promise( (resolve, reject) => {
    const food = req.body.food
    validation(food, (err) => {
      if (err) {
        return reject(err);
      }
      database.raw('INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?) RETURNING id, name, calories',
        [food.name, food.calories, new Date])
          .then(resolve)
          .catch(reject)
    });
  })
}

function destroy(req) {
  return database.raw('DELETE FROM foods WHERE id = ?', req.params.id)
}

function validation(food, callback) {
  if (!food.calories) {
    return callback(new Error('Food must have calories.'));
  }
  callback();
}

module.exports = {
  all: all,
  create: create,
  destroy: destroy
};

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);

function all(){
  return database.raw('SELECT * FROM foods')
};

function create(name, calories) {
  return new Promise( (resolve, reject) => {

    calorieValidation(calories, (err) => {
      if (err) {
        return reject(err);
      }

      nameValidation(name, (err) => {
        if (err) {
          return reject(err);
        }

        database.raw('INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?) RETURNING id, name, calories',
          [name, calories, new Date])
            .then(resolve)
            .catch(reject)
      })
    });
  })
}
function find (id) {
  return database.raw('SELECT * FROM foods WHERE id = ?', id)
};

function update(req) {
  return new Promise( (resolve, reject) => {
    const food = req.body.food

    let query;

    if (!food.calories && food.name) {
      query = database.raw('UPDATE foods SET name = ?, created_at = ? WHERE id = ?',
        [food.name, new Date, req.params.id])
    } else if (food.calories && !food.name) {
      query = database.raw('UPDATE foods SET calories = ?, created_at = ? WHERE id = ?',
        [food.calories, new Date, req.params.id])
    } else {
      query = database.raw('UPDATE foods SET name = ?, calories = ?, created_at = ? WHERE id = ?',
        [food.name, food.calories, new Date, req.params.id])
    }

    query.then(() => {
      return find(req.params.id)
    })
    .then(resolve)
    .catch(reject)
  });
}

function destroy(req) {
  return database.raw('DELETE FROM foods WHERE id = ?', req.params.id)
}

function calorieValidation(calories, callback) {
  if (!calories) {
    return callback(new Error('Food must have calories.'));
  }
  callback();
}

function nameValidation(name, callback) {
  if (!name) {
    return callback(new Error('Food must have name.'));
  }
  callback();
}

module.exports = {
  all: all,
  create: create,
  update: update,
  find: find,
  destroy: destroy
};

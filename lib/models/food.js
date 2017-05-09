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
  destroy: destroy
};

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);

class Food {

  calorieValidation (calories, callback) {
    if (!calories) {
      return callback(new Error('Food must have calories.'));
    }
    callback();
  };

  nameValidation (name, callback) {
    if (!name) {
      return callback(new Error('Food must have name.'));
    }
    callback();
  }

  all () {
    return database.raw(`SELECT * FROM foods WHERE status = 'active'`);
  };

  create (name, calories) {
    return new Promise( (resolve, reject) => {

      this.calorieValidation(calories, (err) => {
        if (err) {
          return reject(err);
        }

        this.nameValidation(name, (err) => {
          if (err) {
            return reject(err);
          }

          database.raw('INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?) RETURNING id, name, calories',
            [name, calories, new Date])
              .then(resolve)
              .catch(reject)
        });
      });
    });
  };

  find (id) {
    return database.raw('SELECT * FROM foods WHERE id = ?', id)
  }

  update (req) {
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
        return this.find(req.params.id)
      })
      .then(resolve)
      .catch(reject)
    });
  };

  destroy (req) {
    return database.raw('DELETE FROM foods WHERE id = ?', req.params.id)
  }
}

module.exports = Food;

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);

class Meal {

  findByDate (date, category) {
    return database.raw(`SELECT meals.*, foods.name AS food_name, foods.calories AS calories,
                                categories.name AS category_name
                         FROM meals
                         JOIN categories ON category_id = categories.id
                         JOIN foods ON food_id = foods.id
                         WHERE date = ? AND categories.name = ?`,
      [`${date.year}/${date.month}/${date.day}`, category])
  }

}

module.exports = Meal;

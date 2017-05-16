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

  static create(mealAttrs) {
    return database.raw(`SELECT * FROM categories WHERE name = ?`, mealAttrs.category)
    .then((data) => {
      let categoryID = data.rows[0].id;
      return database.raw(`INSERT INTO meals(date, category_id, food_id)
                           VALUES (?, ?, ?)
                           RETURNING *`,
                           [mealAttrs.date, categoryID, mealAttrs.foodID])
    }).then((data) => {
      return database.raw(`SELECT meals.*, categories.name AS category
                           FROM meals
                           JOIN categories ON category_id = categories.id
                           WHERE meals.id = ?`,
                           [data.rows[0].id])
    })
  }

}

module.exports = Meal;

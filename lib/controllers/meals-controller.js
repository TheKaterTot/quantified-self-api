const Meal = require('../models/meal');

class MealsController {
  constructor() {
    this.meal = new Meal;
  }

  index(req, res) {
    let category = req.params.category;

    this.meal.findByDate(req.params, category)
    .then((data) => {
      res.json(data.rows)
    })
  }
}

module.exports = MealsController;

const Meal = require('../models/meal');

class MealsController {
  constructor() {
    this.meal = new Meal;
  }

  index(req, res) {
    let day = new Date(req.params.year, req.params.month, req.params.day);
    let category = req.params.category;

    this.meal.findByDate(day, category)
    .then((data) => {
      res.json(data.rows)
    })
  }
}

module.exports = MealsController;

const Meal = require('../models/meal');

function index(req, res) {
  let day = new Date(req.params.year, req.params.month, req.params.day);
  let category = req.params.category;
  
  Meal.findByDate(day, category)
  .then((data) => {
    res.json(data.rows)
  })
}

module.exports = {
  index: index
}

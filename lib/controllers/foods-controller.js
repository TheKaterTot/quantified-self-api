const Food = require('../models/food');

class FoodsController {
  constructor () {
    this.food = new Food;
  }

  index (req, res) {
    this.food.all()
      .then( (foods) => {
        res.json(foods.rows)
      });
  }

  create (req, res) {
    this.food.create(req.body.food.name, req.body.food.calories)
      .then( (data) => {
        res.json(data.rows[0]);
      });
  }

  update (req, res) {
    this.food.update(req)
      .then( (data) => {
        res.json(data.rows[0]);
      });
  }

  destroy (req, res) {
    this.food.destroy(req)
      .then( (data) => {
        res.status(200).end();
      })
  }

}

module.exports = FoodsController;

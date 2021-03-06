const MealsRouter = require('express').Router();
const MealsController = require('../controllers/meals-controller');

const mealsController = new MealsController;

MealsRouter.get('/:category/:year/:month/:day', (req, res) => {
  mealsController.index(req, res);
})

MealsRouter.post('/', mealsController.create)

MealsRouter.delete('/:id', (req, res) => {
  mealsController.destroy(req, res);
})

module.exports = MealsRouter;

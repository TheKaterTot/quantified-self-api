const MealsRouter = require('express').Router();
const MealsController = require('../controllers/meals-controller');

MealsRouter.get('/:category/:year/:month/:day', MealsController.index);

module.exports = MealsRouter;

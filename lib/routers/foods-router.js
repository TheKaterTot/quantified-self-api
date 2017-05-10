const FoodsRouter = require('express').Router();
const FoodsController = require('../controllers/foods-controller');
const foodsController = new FoodsController;

FoodsRouter.get('/', (req, res) => {
  foodsController.index(req, res);
})

FoodsRouter.post('/', (req, res) => {
  foodsController.create(req, res);
})

FoodsRouter.patch('/:id', (req, res) => {
  foodsController.update(req, res);
})

FoodsRouter.delete('/:id', (req, res) => {
  foodsController.destroy(req, res);
})

module.exports = FoodsRouter;

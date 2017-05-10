const FoodsRouter = require('express').Router();
const FoodsController = require('../controllers/foods-controller');

FoodsRouter.get('/', FoodsController.index);
FoodsRouter.post('/', FoodsController.create);
FoodsRouter.patch('/:id', FoodsController.update);
FoodsRouter.delete('/:id', FoodsController.destroy);

module.exports = FoodsRouter;

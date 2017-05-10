const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000

const FoodsController = require('./lib/controllers/foods-controller');
const MealsController = require('./lib/controllers/meals-controller');
const Food = require('./lib/models/food');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', port);

app.listen(port, function () {
  console.log(`Listening on port ${port}!`);
});

app.get('/api/foods', FoodsController.index);
app.post('/api/foods', FoodsController.create);
app.patch('/api/foods/:id', FoodsController.update);
app.delete('/api/foods/:id', FoodsController.destroy);

app.get('/api/meals/:category/:year/:month/:day', MealsController.index);

module.exports = app;

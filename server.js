const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

const FoodsController = require('./lib/controllers/foods-controller')
const Food = require('./lib/models/food')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.set('port', process.env.PORT || 3000);

app.get('/api/foods', FoodsController.index);

app.post('/api/foods', FoodsController.create);

app.patch('/api/foods/:id', (req, res) =>{
  const id = req.params.id
  const name = req.body.food.name
  const calories = req.body.food.calories
  const food = Food.find(id)

   database.raw('UPDATE foods SET name = ?, calories = ? WHERE id = ? RETURNING *',
    [name || food.name, calories || food.calories, id])
    .then( (data) => {
      if (!data.rowCount) { res.sendStatus(404) };

      res.status(202).json(data.rows[0])
  });
});

app.delete('/api/foods/:id', FoodsController.destroy);

module.exports = app;

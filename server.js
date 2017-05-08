const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.set('port', process.env.PORT || 3000);

app.get('/api/foods', (req, res) => {
  database.raw('SELECT * FROM foods')
    .then( (foods) => {
      res.json(foods.rows)
    })
});
module.exports = app;

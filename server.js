const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

const FoodsController = require('./lib/controllers/foods-controller')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.set('port', process.env.PORT || 3000);

app.get('/api/foods', FoodsController.index);

app.post('/api/foods', FoodsController.create);

app.delete('/api/foods/:id', FoodsController.destroy);

module.exports = app;

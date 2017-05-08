const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const FoodsController = require('./lib/controllers/foods-controller')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.set('port', process.env.PORT || 3000);

app.get('/api/foods', FoodsController.index);

module.exports = app;

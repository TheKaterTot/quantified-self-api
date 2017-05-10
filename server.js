const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

const foodsRouter = require('./lib/routers/foods-router');
const mealsRouter = require('./lib/routers/meals-router');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', port);
app.listen(port, function () {
  console.log(`Listening on port ${port}!`);
});

app.use('/api/foods/', foodsRouter);
app.use('/api/meals/', mealsRouter);

module.exports = app;

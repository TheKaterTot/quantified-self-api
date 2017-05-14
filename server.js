const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

const foodsRouter = require('./lib/routers/foods-router');
const mealsRouter = require('./lib/routers/meals-router');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', port);
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
  next();
});
app.listen(port, function () {
  console.log(`Listening on port ${port}!`);
});

app.use('/api/foods/', foodsRouter);
app.use('/api/meals/', mealsRouter);

module.exports = app;

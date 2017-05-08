const Food = require('../models/food');

function index (req, res){
  Food.all()
    .then( (foods) => {
      res.json(foods.rows)
    });
};

function create (req, res){
  Food.create(req)
    .then( (data) => {
      res.json(data.rows[0]);
    });
};

module.exports = {
  index: index,
  create: create
};

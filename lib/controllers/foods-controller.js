const Food = require('../models/food');

function index (req, res) {
  Food.all()
    .then( (foods) => {
      res.json(foods.rows)
    });
};

function create (req, res) {
  Food.create(req)
    .then( (data) => {
      res.json(data.rows[0]);
    });
};

// function update(req, res){
//   Food.update(req)
//   // .then( (data) => {
//   //   if (!data) { return response.sendStatus(400) }
//   //   const food =
//   // });
// };

function destroy (req, res) {
  Food.destroy(req)
    .then( (data) => {
      res.status(200).end();
    })
}

module.exports = {
  index: index,
  create: create,
  destroy: destroy
};

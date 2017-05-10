const assert = require('chai').assert;
const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);
const Food = require('../lib/models/food');
const food = new Food

describe('Food', () => {
  it('is invalid without calories', (done) => {
    food.create('banana')
      .catch( (err) => {
        assert.equal(err.message, 'Food must have calories.')
      })

    done();
  })

  it('is invalid without name', (done) => {
    food.create(null, 40)
      .catch( (err) => {
        assert.equal(err.message, 'Food must have name.')
      })

    done();
  })
})

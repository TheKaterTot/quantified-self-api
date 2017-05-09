const assert = require('chai').assert;
const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);
const Food = require('../lib/models/food');

describe('Food', () => {
  it('is invalid without calories', (done) => {
    Food.create({name: 'banana', calories: null})
      .catch( (err) => {
        assert.equal(err.message, 'Food must have calories.')
      })

    done()
  })
})

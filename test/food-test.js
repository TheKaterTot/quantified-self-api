const assert = require('chai').assert;
const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);
const Food = require('../lib/models/food');

describe('Food', () => {
  it('is invalid without calories', (done) => {
    Food.create('banana')
      .catch( (err) => {
        assert.equal(err.message, 'Food must have calories.')
      })

    done();
  })

  it('is invalid without name', (done) => {
    Food.create(null, 40)
      .catch( (err) => {
        assert.equal(err.message, 'Food must have name.')
      })

    done();
  })
})

const assert = require('chai').assert;
const app = require('../server.js');
const request = require('request');
const Food = require('../lib/models/food');
const food = new Food

const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

function truncate (done) {
  database.raw('TRUNCATE foods RESTART IDENTITY CASCADE').then(() => {
    return database.raw('TRUNCATE categories RESTART IDENTITY CASCADE');
  }).then(() => {
    return database.raw('TRUNCATE meals RESTART IDENTITY CASCADE');
  }).then(() => {
    done();
  }).catch(done);
}

describe('Server', () => {
  before(done => {
    this.port = 9876;
    this.server = app.listen(this.port, (err, result) => {
      if (err) {
        return done(err);
      }
      done();
    })

    this.request = request.defaults({
      baseUrl: 'http://localhost:9876/'
    })
  })

  after( () => {
    this.server.close();
  })

  it('should exist', () => {
    assert(app);
  })
})

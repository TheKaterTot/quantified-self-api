const assert = require('chai').assert;
const app = require('../server.js');
const request = require('request');

const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

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

  describe('GET /api/foods', () => {
    beforeEach((done) => {
      database.raw(
        'INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)',
        ['burrito', 700, new Date]
      ).then(() => done());
    })

    afterEach((done) => {
      database.raw('TRUNCATE foods RESTART IDENTITY')
      .then(() => done());
    })

    it('should return 200', (done) => {
      this.request.get('api/foods', (err, res) => {
        if (err) { return done(err) }

        assert.equal(res.statusCode, 200);

        done();
      })
    })

    it('should return the id, name, calories', (done) => {
      this.request.get('api/foods', (err, res) => {
        if (err) { return done(err) }
        const id = 1
        const name = 'burrito'
        const calories = 700

        let parsedFood = JSON.parse(res.body)

        assert.equal(parsedFood[0].id, id);
        assert.equal(parsedFood[0].name, name);
        assert.equal(parsedFood[0].calories, calories);
        assert.ok(parsedFood[0].created_at);
        done();
      })
    })
  })

  describe('POST /api/foods', () => {
    afterEach((done) => {
      database.raw('TRUNCATE foods RESTART IDENTITY')
      .then(() => done());
    })

    it('should return 200', (done) => {
      const food = {
        name: 'chicken',
        calories: 200
      }

      this.request.post('api/foods', { form: {food: food} }, (err, res) => {
        if (err) { return done(err) }

        let parsedFood = JSON.parse(res.body);

        assert.equal(res.statusCode, 200);
        assert.equal(parsedFood.name, 'chicken');
        assert.equal(parsedFood.calories, 200);

        done();
      })
    })
  })
})

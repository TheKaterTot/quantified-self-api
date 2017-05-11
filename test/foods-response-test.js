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
  });

  describe('GET /api/foods', () => {
    beforeEach((done) => {
      database.raw(
        'INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)',
        ['burrito', 700, new Date]
      ).then(() => done());
    })

    afterEach(truncate)

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
    afterEach(truncate)

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

  describe('PATCH /api/foods', () => {
    beforeEach((done) => {
      database.raw(
        'INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)',
        ['popcorn', 50, new Date]
      ).then(() => done());
    })

    afterEach(truncate)

    it('can update the name of a food', (done) => {
      const newName = { food: {name: "chocolate cake", calories: 300}}

      this.request.patch('/api/foods/1', { form: newName}, (err, res) => {
        if (err) { done(err) }

        assert.equal(res.statusCode, 200);

        const parsedFood = JSON.parse(res.body);
        assert.equal(parsedFood.name, "chocolate cake");
        done();
      })
    })

    it('can update the calories of a food and not the name', (done) => {
      const newCal = { food: {name: '', calories: 1000} }

      this.request.patch('/api/foods/1', { form: newCal }, (err, res) => {
        if (err) { done(err) }
        assert.equal(res.statusCode, 200);

        const parsedFood = JSON.parse(res.body);
        assert.equal(parsedFood.name, 'popcorn');
        assert.equal(parsedFood.calories, 1000);
        done();
      })
    })

  })

  describe('DELETE /api/foods', () => {
    beforeEach((done) => {
      database.raw(
        'INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)',
        ['burrito', 700, new Date]
      ).then((data) => {
        return database.raw('SELECT * FROM foods WHERE name = ?', 'burrito')
      }).then((data) => {
        this.id = data.rows[0].id
        done();
      })
    })

    it('should return 200', (done) => {
      this.request.delete(`api/foods/${this.id}`, (err, res) => {
        if (err) { return done(err) }

        assert.equal(res.statusCode, 200);

        database.raw('SELECT * FROM foods WHERE id = ?', this.id)
          .then((data) => {
            assert.equal(data.rows.length, 0)
            done();
          })
      })
    })
  })
});

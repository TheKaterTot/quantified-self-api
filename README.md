### General Information about Quantified Self ###
The quantified self API is the backend to https://github.com/cmacaulay/quantified-self, a webapp to track calories throughout your day.

The quantified self API is a Node.js(v7.2.1)/Express app using PostgresQL and knex.

### Setup ###

Clone down this repo, cd into the directory, and run npm install.

To set up your DB, knex migrate:latest.

To run the tests, npm test. (Note: Some of the tests use Selenium, which requires FireFox 46 to run correctly).

### Using the quantified-self-api ###

**Base URL: https://q-self-api.herokuapp.com/**

***Foods***

Getting all foods:

GET api/foods

Response:
```json
[
  {"id":1,
  "name":"burrito",
  "calories":700,
  "created_at":"2017-05-17T03:42:04.074Z",
  "status":"active"},
  { "id":2,
    "name":"corn nuts",
    "calories":450,
    "created_at":"2017-05-17T03:42:04.074Z",
    "status":"inactive"}
]

```
Creating a new food:

POST api/foods

Request:
```json
{
  "food": { 
    "name": "potato", 
    "calories": 100 
  }
 }
 
```
Response:
```json
{"id":10,
  "name":"potato",
  "calories":100,
  "created_at":"2017-05-17T03:42:04.074Z",
  "status":"active"}
```

Editing a food:

PATCH api/foods

Request:
```json
{
  "food": { 
    "name": "potato", 
    "calories": 200 
  }
 }
```

Response:
```json
{"id":10,
  "name":"potato",
  "calories":100,
  "created_at":"2017-05-17T03:42:04.074Z",
  "status":"active"}
  ```
 ***Meals***
 
 There are four meal types available:
 
 - breakfast
 - lunch
 - dinner
 - snacks
 
 Get meals by date
  
 
 GET api/meals/:meal-type/:year/:month/:day
 
 Example: api/meals/breakfast/2017/05/20
 
 Response:
 ```json
  {
  "meal": { 
    "food_id": 3, 
    "category_id": 1,
    "food_name": "salsa",
    "calories": 3,
    "category_name": "breakfast"
  }
 }
 ```
 
 Add a food to a meal
 
 POST api/meals

Request:
 ```json
 {
   "meal": {
     "foodIds": ["1,3"],
     "category": "breakfast",
     "date": "2017/5/15"
   }
  }
 ```
Response:
```json
[{
    "meal": {
      "food_id": 1,
      "category": "breakfast",
      "date": "2017/5/15"
    }
  },
  {
    "meal": {
      "food_id": 3,
      "category": "breakfast",
      "date": "2017/5/15"
    }
  }]
```

Delete a food from a meal
 
DELETE api/meals/:id

Will return a 200 if the food was successfully deleted from the meal.

  

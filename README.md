# quantified-self-api

**Base URL: https://q-self-api.herokuapp.com/**

***Foods***

Getting all foods:

GET api/foods

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
  food: { 
    name: "potato", 
    calories: 100 
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
  food: { 
    name: "potato", 
    calories: 200 
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
 ***Meals**
 
 There are four meal types available:
 
 breakfast
 lunch
 dinner
 snacks
 
 Get meals by date
  
 
 GET api/meals/<meal-type>/<year>/<month>/<day>
 
 Example: api/meals/breakfast/2017/05/20
 
 Response:
 ```json
  {
  meal: { 
    food_id: 3, 
    category_id: 1,
    food_name: "salsa",
    calories: 3,
    category:name: "breakfast"
  }
 }
 ```
 
 Add a food to a meal
 
 POST api/meals
 
 ```json
 {
   meal: {
     foodIds: ["1,3"],
     category: "breakfast",
     date: '2017/5/15'
   }
  }
 ```
 
Delete a food from a meal
 
DELETE api/meals/:id

Will return a 200 if the food was successfully deleted from the meal.

  

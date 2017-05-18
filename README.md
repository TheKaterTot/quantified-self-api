# quantified-self-api

**Base URL: https://q-self-api.herokuapp.com/**

***Foods***

Getting all foods:

GET api/foods

``
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

``

Creating a new food:

POST api/foods

Request:
``
{
  food: { 
    name: "potato", 
    calories: 100 
  }
 }
 
``
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
``
{
  food: { 
    name: "potato", 
    calories: 200 
  }
 }
``

Response:
``
{"id":10,
  "name":"potato",
  "calories":100,
  "created_at":"2017-05-17T03:42:04.074Z",
  "status":"active"}
  ``
  
  

# movie_rental_api

This work is an API that represents movies rental application.
It is a Node.js app written in Typescript programming language. It uses express, sequelize, Mysql, Jest, jsonwebtoken and other technologies.
## Installation
Make sure to have installed Node.js and Mysql in your computer.
After cloning the repository, run:

         yarn install

Fill the configuration databases at ./src/infra/connection.ts, ./config and sequelize.config.js with values of username, password, database, dialect and host from your database.

Then run the migrations with:

        yarn migrate

## Routes:

### SIGNUP User
Method: POST
URL: http://localhost:3003/user/signup
Content-Type: application/json
BODY:
{
    "name": "Teste",
    "email":"teste@teste.com",
    "login": "teste",
    "password": "123456"
}
RESPONSE: {token: 'valid_token'}
***
### LOGIN User
Method: POST
URL http://localhost:3003/user/login
Content-Type: application/json
BODY:
{
    "email":"teste@teste.com",
    "password": "123456"
}
RESPONSE: {token: 'valid_token'}
***
### Add Movie
Method: POST
URL: http://localhost:3003/movies/add
Content-Type: application/json
Authorization: valid_token
BODY:
{
    "title": "Teste1",
    "year_release":"2021",
    "category": "Comedy"
}
RESPONSE: true
***
### LIST MOVIES
Method: GET
URL: http://localhost:3003/movies/
Content-Type: application/json
Authorization: valid_token
RESPONSE: 
[
  {
    "id": "8cd2cd71-a451-41b6-a788-68ff7c4fb4d3",
    "title": "title_again",
    "year_release": "2001",
    "category": "ACTION"
  },
  {
    "id": "9965a5b7-ee58-43dd-9a6d-ec1819d57b2e",
    "title": "Teste1",
    "year_release": "2021",
    "category": "COMEDY"
  }
]
***
### GET MOVIE BY ID
Method: GET
URL: http://localhost:3003/movies/:id
Content-Type: application/json
Authorization: valid_token
RESPONSE:
[
  {
    "id": "8cd2cd71-a451-41b6-a788-68ff7c4fb4d3",
    "title": "title_again",
    "year_release": "2001",
    "category": "ACTION"
  }
]
***
### Filters
Method: GET
URL: http://localhost:3003/movies/filters/search?title=TITLE&category=COMEDY&year_release=2020&notation:gt
Content-Type: application/json
Authorization: valid_token
QUERY PARAMS: 
 - title: movie title.
 - category: movie category.
 - year_release: year of creation
 - notation: years to search (gt = ">" and lt = "<")
RESPONSE:
[
  {
    "id": "9965a5b7-ee58-43dd-9a6d-ec1819d57b2e",
    "title": "Teste1",
    "year_release": "2021",
    "category": "COMEDY"
  }
]

Example: http://localhost:3003/movies/filters/search?title=TITLE&category=COMEDY&year_release=200&notation:gt, is going to search a title named "TITLE", category named "COMEDY", year_release greater than 2000 
***
### Delete a movie
Method: DELETE
URL http://localhost:3003/movies/:id
Content-Type: application/json
Authorization: valid_token
RESPONSE: true
***
### Update Movie
Method: PATCH
URL: http://localhost:3003/movies/:id
Content-Type: application/json
Authorization: any_token
BODY:
{
    "title": "title_again",
    "category": "ACTION",
    "year_release": "2001"
}
RESPONSE: true

## Scripts:
 - yarn start:  run the application,
 - yarn dev: run the appication ts-node-dev,
 - yarn db:create: create migrations at test enviroment,
 - yarn migrate: run migrations at test enviroment,
 - yarn test: run tests

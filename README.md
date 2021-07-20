# car_api
This project is a CRUD of car object using Node.JS, Typescript, Express, Typeorm. For tests, Mocha and Chai.

## Routes
    
    Path:  http://localhost:3333
    

All routes are detailed with success calls at docs folder, and there is, also, a json file exported from [Insomnia Rest](https://insomnia.rest/) with the routes

## Initialize Project

    Install packages: npm i
    Run application: npm start

## Run Tests
    npm run test

## Run coverage
    It returns a coverage report in HTML format at folder coverage.

    npm run coverage

## Database

**Configuration**

All configuration can be found at ormconfig.json, it was made using [PostgreSQL](https://www.postgresql.org/)

**Tables**
    
All table schemas are available at migrations folder: _src/shared/database/migrations_

    To create the tables at SQL DataBase, run:
      npm run typeorm migration:run

#### Developed By

    Lucas M Gomes
    lgomes@post.com
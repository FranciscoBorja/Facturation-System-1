# TriHard-Reservations Server

Installation
```bash
npm install
```
or
```bash
yarn install
```
## To Run
```bash
npm run start
```
With Nodemon
```bash
npm run nodemon
```
### Create role
```bash
CREATE USER trihard_user PASSWORD '123456';
ALTER ROLE trihard_user WITH SUPERUSER;
ALTER ROLE trihard_user WITH LOGIN;
```
### Create Database 
```bash
CREATE DATABASE "trihard_reservations_db"
    WITH 
    OWNER = trihard_user
    ENCODING = 'UTF8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;
```
### Create Schemas
```
   CREATE SCHEMA IF NOT EXISTS access AUTHORIZATION trihard_user;
   CREATE SCHEMA IF NOT EXISTS corporations AUTHORIZATION trihard_user;
   CREATE SCHEMA IF NOT EXISTS persons AUTHORIZATION trihard_user;
   CREATE SCHEMA IF NOT EXISTS processes AUTHORIZATION trihard_user;
   CREATE SCHEMA IF NOT EXISTS catalogs AUTHORIZATION trihard_user;
```
### Migrate the tables
```
 knex migrate:latest
```


### Add records in the tables #Dates testing
```bash
knex seed:run
```

### To do tests in postman
url = localhost:8000/users





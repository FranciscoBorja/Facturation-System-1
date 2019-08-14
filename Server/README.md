# Facturation System Server

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
CREATE USER facturation_user PASSWORD '123456';
ALTER ROLE facturation_user WITH SUPERUSER;
ALTER ROLE facturation_user WITH LOGIN;
```
### Create Database 
```bash
CREATE DATABASE "facturation_system_db"
    WITH 
    OWNER = facturation_user
    ENCODING = 'UTF8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;
```
### Create Schemas
```
   CREATE SCHEMA IF NOT EXISTS access AUTHORIZATION facturation_user;
   CREATE SCHEMA IF NOT EXISTS corporations AUTHORIZATION facturation_user;
   CREATE SCHEMA IF NOT EXISTS persons AUTHORIZATION facturation_user;
   CREATE SCHEMA IF NOT EXISTS processes AUTHORIZATION facturation_user;
   CREATE SCHEMA IF NOT EXISTS catalogs AUTHORIZATION facturation_user;
```
### Migrate the tables
```
 knex migrate:latest
```


### Add records in the tables #Dates testing
```bash
knex seed:run
```

### 





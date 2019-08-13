;
const express = require('express');
const bodyParser = require('body-parser');

const app = express(),
    user_routes = require('./users'),
    services_routes = require('./services'),
    reservations_routes = require('./reservations');
app.use('/users', user_routes);
app.use('/services', services_routes);
app.use('/reservations', reservations_routes);
module.exports = app;


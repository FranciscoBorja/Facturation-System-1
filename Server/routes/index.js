;
const express = require('express');
const bodyParser = require('body-parser');

const app = express(),
    user_routes = require('./users'),
    services_routes = require('./services'),
    processes_routes = require('./processes');
app.use('/users', user_routes);
app.use('/services', services_routes);
app.use('/processes', processes_routes);
module.exports = app;


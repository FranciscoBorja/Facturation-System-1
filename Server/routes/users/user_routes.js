;
const express = require('express');
const api = express.Router(),
    crudController = require('../../app/Http/Controllers/user_controller'),
    middlewares = require('../../app/Http/Middelware/jwt_middleware');

api.put('/registerAdmin', middlewares.ensureTokenAdmin, crudController.registerUserAdmin);
api.post('/login', crudController.loginUser);
api.post('/delete', middlewares.ensureTokenAdmin, crudController.deleteUser);
api.post('/update', [middlewares.ensureToken || middlewares.ensureTokenAdmin], crudController.modifyUser);
api.get('/getProviders', crudController.getProviders);
api.get('/getClients', crudController.getClients);
api.get('/getAllUsers', middlewares.ensureTokenAdmin, crudController.getAllUsers);

module.exports = api;

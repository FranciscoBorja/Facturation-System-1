;
const express = require('express');
const api = express.Router(),
    crudController = require('../../app/Http/Controllers/services_controller');
middlewares = require('../../app/Http/Middelware/jwt_middleware');


api.post('/register', [middlewares.ensureTokenAdmin], crudController.registerServices);
api.post('/registerImage', [middlewares.ensureTokenAdmin], crudController.registerServicesImage);
api.post('/update', middlewares.ensureTokenAdmin, crudController.updateServices);
api.post('/updateSubServices', middlewares.ensureTokenAdmin, crudController.UpdateSubServices);
api.delete('/delete', middlewares.ensureTokenAdmin, crudController.deleteServices);
api.get('/get', crudController.getServices);
api.post('/get_sub_services', middlewares.ensureToken, crudController.getSubServices);
api.post('/get_all_sub_services', middlewares.ensureTokenAdmin, crudController.getAllSubServices);
api.post('/registerSubServices', middlewares.ensureTokenAdmin, crudController.registerSubServices);

module.exports = api;

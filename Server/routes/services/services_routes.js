;
const express = require('express');
const api = express.Router(),
    crudController = require('../../app/Http/Controllers/services_controller');
middlewares = require('../../app/Http/Middelware/jwt_middleware');


api.post('/registerTypeProducts', [middlewares.ensureTokenAdmin], crudController.registerTypeProducts);
api.post('/updateProducts', middlewares.ensureTokenAdmin, crudController.updateProducts);
api.get('/get_TypeProducts', crudController.getTypeProducts);
api.post('/get_productsbyID', [middlewares.ensureToken || middlewares.ensureTokenAdmin], crudController.getProductsbyId);
api.post('/get_all_products', middlewares.ensureTokenAdmin, crudController.getAllProducts);
api.post('/registerProducts', middlewares.ensureTokenAdmin, crudController.registerProducts);
api.post('/registerQProducts', middlewares.ensureTokenAdmin, crudController.registerProductsInWineries);
api.post('/updateQProducts', middlewares.ensureTokenAdmin, crudController.updateQuantity);

module.exports = api;

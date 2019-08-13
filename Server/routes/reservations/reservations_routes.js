;
const express = require('express');
const api = express.Router(),
    crudController = require('../../app/Http/Controllers/reservations_controller'),
    middlewares = require('../../app/Http/Middelware/jwt_middleware');

//api.post('/register', middlewares.ensureToken,crudController.registerReservations);
api.put('/register', middlewares.ensureToken, crudController.registerReservations);
api.put('/registerNotification', middlewares.ensureToken, crudController.registerNotification);
api.post('/get', middlewares.ensureToken, crudController.getReservations);
api.post('/getNotification', middlewares.ensureToken, crudController.getNotifications);
api.get('/getReservas', middlewares.ensureTokenAdmin, crudController.getAllReservations);
api.get('/getAllNotifications', middlewares.ensureTokenAdmin, crudController.getAllNotifications);
api.post('/update', middlewares.ensureTokenAdmin, crudController.updateReservations);
api.post('/updateNotification', middlewares.ensureTokenAdmin, crudController.updateNotification);
api.post('/delete', middlewares.ensureTokenAdmin, crudController.deleteReservations);
api.post('/getHours', middlewares.ensureTokenAdmin, crudController.getUsedHours);

module.exports = api;

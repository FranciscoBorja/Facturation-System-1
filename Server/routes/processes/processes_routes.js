;
const express = require('express');
const api = express.Router(),
    crudController = require('../../app/Http/Controllers/processes_controller'),
    middlewares = require('../../app/Http/Middelware/jwt_middleware');

//api.post('/register', middlewares.ensureToken,crudController.registerReservations);
api.post('/registerSaleNote',[middlewares.ensureToken||middlewares.ensureTokenAdmin],crudController.registerSalesNotes);
api.post('/updateSaleNotesById',[middlewares.ensureToken||middlewares.ensureTokenAdmin],crudController.updateSalesNotesById);
api.post('/getSalesbyIDUser',[middlewares.ensureToken||middlewares.ensureTokenAdmin],crudController.getSales_notesbyIDUser);
api.post('/getDetailbySale',[middlewares.ensureToken||middlewares.ensureTokenAdmin],crudController.getDetailSaleNotebyIDSaleNote);
api.post('/getDetailbyTypesell',[middlewares.ensureToken||middlewares.ensureTokenAdmin],crudController.getSalesNotesbyTypeSell);

module.exports = api;

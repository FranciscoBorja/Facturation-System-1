;
const express = require('express');
const api = express.Router(),
    crudController = require('../../app/Http/Controllers/processes_controller'),
    middlewares = require('../../app/Http/Middelware/jwt_middleware');

//api.post('/register', middlewares.ensureToken,crudController.registerReservations);
api.post('/registerSaleNote',middlewares.ensureTokenAdmin,crudController.registerSalesNotes);
api.post('/registerDetailSaleNote',middlewares.ensureTokenAdmin,crudController.registerDetailSalesNotes);
api.post('/updateSaleNotesById',middlewares.ensureTokenAdmin,crudController.updateSalesNotesById);
api.post('/getSalesbyIDUser',middlewares.ensureTokenAdmin,crudController.getSales_notesbyIDUser);
api.post('/getDetailbySale',middlewares.ensureTokenAdmin,crudController.getDetailSaleNotebyIDSaleNote);
api.post('/getDetailbyTypesell',middlewares.ensureTokenAdmin,crudController.getSalesNotesbyTypeSell);

module.exports = api;

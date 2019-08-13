;
const bcrypt = require('bcrypt');
const config = require('../../../knexfile');
const atob = require('atob');
const Blob = require('node-blob');

let db = require('knex')(config['development']);


//CRUD SERVICES
let registerServices = (req, res) => {
    let {name, description} = req.body.params;
    db('corporations.services').insert({name, description, image: image.buffer, imageType}).returning('id')
        .then(result => {
            return res.status(200).json({
                ok: true,
                action: 'Insert',
                id: result
            })
        });
};
let registerServicesImage = (req, res) => {
    let {name, description} = req.body.params;
    db('corporations.services').insert({name, description}).returning('id')
        .then(result => {
            return res.status(200).json({
                ok: true,
                action: 'Insert',
                id: result
            })
        });
};

let registerSubServices = (req, res) => {
    let {name, duration, price, service_id} = req.body.params;
    db('corporations.sub_services').insert({name, duration, price, service_id}).returning('id')
        .then(result => {
            return res.status(200).json({
                ok: true,
                action: 'Insert',
                id: result
            })
        });
};
let UpdateSubServices = (req, res) => {
    let {name, duration, price, service_id, id} = req.body.params;


    db('corporations.sub_services').update({name, duration, price, service_id}).where('id', '=', id)
        .then(result => {
            return res.status(200).json({
                ok: true,
                action: 'Modify',
                data: result
            })
        });
};

const getServices = (req, res) => {
    db('corporations.services').select("*")
        .then(result => {
            return res.status(200).json({
                ok: true,
                action: 'GET',
                data: result
            })
        })
};

const getSubServices = (req, res) => {
    let id = req.body.id;
    db('corporations.sub_services').select('*').where('service_id', "=", id)
        .then(result => {
            return res.status(200).json({
                ok: true,
                action: 'GET',
                data: result
            })
        })
        .catch(err => {
            return res.status(500).json({
                    ok: false,
                    action: 'GET',
                    message: err
                })
            }
        )
};
const getAllSubServices = (req, res) => {
    let id = req.body.id;
    db('corporations.sub_services').select('*')
        .then(result => {
            return res.status(200).json({
                ok: true,
                action: 'GET',
                data: result
            })
        })
        .catch(err => {
                return res.status(500).json({
                    ok: false,
                    action: 'GET',
                    message: err
                })
            }
        )
};

let deleteServices = (req, res) => {
    let id = req.body.id;
    db('corporations.services').where('id', id).del().then(result => {
        return res.status(200).json({
            ok: true,
            action: 'Delete',
            id: result
        })
    });
};
let updateServices = (req, res) => {
    let name = req.body.name;
    let description = req.body.description;
    let price = req.body.price;
    //let image = req.body.image;
    let id = req.body.id || false;
    if (id) {
        db('corporations.services')
            .where('id', '=', id)
            .update(name, description, price).then(function (result) {
            return res.status(200).json({
                ok: true,
                action: 'Modify',
                id: result
            })
        }).catch(function (err) {
            return res.send(err)
        });
    }
};

module.exports = {

    //CRUD SERVICES
    registerServices,
    getServices,
    getSubServices,
    updateServices,
    deleteServices,
    getAllSubServices,
    registerSubServices,
    registerServicesImage,
    UpdateSubServices
};

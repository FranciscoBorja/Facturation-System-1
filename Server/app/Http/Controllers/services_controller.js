;
const bcrypt = require('bcrypt');
const config = require('../../../knexfile');
const atob = require('atob');
const Blob = require('node-blob');

let db = require('knex')(config['development']);

const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, {type: contentType});
};
//CRUD SERVICES
let registerServices = (req, res) => {
    let {name, description} = req.body.params;
    let imageType = req.body.image.type
    let image = b64toBlob(req.body.image.base64, req.body.image.type)
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

const structureImages = (records) => {
    let newArray = [];

    records.forEach(record => {
        if (record.image !== null) {
            let buffer = Buffer.from(record.image);
            let bufferBase64 = buffer.toString('base64');
            newArray.push({...record, image: bufferBase64})
        } else {
            newArray.push({...record, image: ''})
        }
    });
    return newArray;
};

const getServices = (req, res) => {
    db('corporations.services').select("*")
        .then(result => {
            const newResult = structureImages(result);
            return res.status(200).json({
                ok: true,
                action: 'GET',
                data: newResult
            })
        })
    // .then(result => {
    //     console.log('Finish...');
    //     return res.status(200).json({
    //         ok: true,
    //         action: 'GET',
    //         data: result
    //     })
    // });
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

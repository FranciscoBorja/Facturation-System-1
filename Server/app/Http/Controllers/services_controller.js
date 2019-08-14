;
const bcrypt = require('bcrypt');
const config = require('../../../knexfile');
const atob = require('atob');
const Blob = require('node-blob');

let db = require('knex')(config['development']);


//CRUD SERVICES
let registerTypeProducts = (req, res) => {
    let {name, description} = req.body.params;
    db('corporations.type_products').insert({name, description}).returning('id')
        .then(result => {
            return res.status(200).json({
                ok: true,
                action: 'Insert',
                id: result
            })
        });
};


let registerProducts = (req, res) => {
    let {name, price_sell, price_buy,type_products_id} = req.body.params;
    db('corporations.products').insert({name, price_sell, price_buy,type_products_id}).returning('id')
        .then(result => {
            return res.status(200).json({
                ok: true,
                action: 'Insert',
                id: result
            })
        });
};
let updateProducts = (req, res) => {
    let {name,  price_sell, price_buy,type_products_id,id} = req.body.params;


    db('corporations.products').update({name,  price_sell, price_buy,type_products_id}).where('id', '=', id)
        .then(result => {
            return res.status(200).json({
                ok: true,
                action: 'Modify',
                data: result
            })
        });
};

const getTypeProducts = (req, res) => {
    db('corporations.type_products').select("*")
        .then(result => {
            return res.status(200).json({
                ok: true,
                action: 'GET',
                data: result
            })
        })
};

const getProductsbyId = (req, res) => {
    let id = req.body.id;
    db('corporations.products').select('*').where('service_id', "=", id)
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
const getAllProducts = (req, res) => {
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

let registerProductsInWineries = (req,res) => {
let {products_id} = req.body.params
    db('corporations.productsXwineries').insert({products_id,
        wineries_id:1,
        quantityOfProducts:0}).then(result => {
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
}
let updateQuantity = (req,res)=>{
    let {quantityOfProducts} = req.body.params
    db('corporations.productsXwineries').update({quantityOfProducts}).then(result => {
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
}

module.exports = {

    //CRUD SERVICES
    registerTypeProducts,
    getTypeProducts,
    getProductsbyId,
    getAllProducts,
    registerProducts,
    updateProducts,
    registerProductsInWineries,
    updateQuantity
};

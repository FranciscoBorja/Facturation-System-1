;
const bcrypt = require('bcrypt');
const config = require('../../../knexfile');
jwt = require('jsonwebtoken');

let db = require('knex')(config['development']);

//CRUD RESERVATIONS



//CRUD SALES_NOTES
    let registerSalesNotes = (req,res) =>{
        let {user_id,typeOfSell_id} = req.body.params
        db('processes.sales_notes').insert({user_id,
            typeOfSell_id,
            state: 'Activa'}).then(result => {
                return res.status(200).json({
                    ok:true,
                    action:'Insert',
                    id:result
                })
        })
            .catch(function(err){
                return res.send(err)
            })
    }
    let updateSalesNotesById = (req,res) =>{
        let {state,id} = req.body.params
        db('processes.sales_notes').update({
            state
        }).where('id','=',id).then( result =>{
            return res.status(200).json({
                ok:true,
                action:'Modify',
                id:result
            })
        }).catch(function(err){
            return res.send(err)
        })
    }
let getSalesNotesbyTypeSell = (req,res) =>{
        let {typeOfSell_id} = req.body.params
    db('processes.sales_notes').select('processes.sales_notes.id','processes.sales_notes.state','persons.users.id','persons.users.first_name','persons.users.last_name','persons.users.phone','persons.users.address','persons.users.email','persons.users.nif').innerJoin('persons.users','processes.sales_notes.user_id','persons.users.id')
        .then(result => {

        }).catch(function(err){
            return res.send(err)
    })
}
let getDetailSaleNotebyIDSaleNote = (req,res) =>{
        let {sales_notes_id} = req.body.params
    db('processes.productsXsales_notes').select('processes.productsXsales_notes.id','processes.productsXsales_notes.quantityXproduct','processes.productsXsales_notes.totalPay','corporations.products.name','corporations.products.price_sell','corporations.products.price_buy').innerJoin('corporations.products','processes.productsXsales_notes.products_id','corporations.products.id')
        .then(result =>{
            return res.status(200)
        })
}
let getSales_notesbyIDUser = (req,res)=>{
        let {id} = req.body.params
    db('processes.sales_notes').select('processes.sales_notes.id','processes.sales_notes.state','persons.users.id','persons.users.first_name','persons.users.last_name','persons.users.phone','persons.users.address','persons.users.email','persons.users.nif').innerJoin('persons.users','processes.sales_notes.user_id','persons.users.id')
        .then(result=>{
            return res.status(200).json({
                ok:true,
                action:'Get',
                id:result
            })

        }).catch(function(err){
        return res.send(err)
    })
    }

module.exports = {
    //CRUD Processes

    registerSalesNotes,
    updateSalesNotesById,
    getSalesNotesbyTypeSell,
    getDetailSaleNotebyIDSaleNote,
    getSales_notesbyIDUser

};

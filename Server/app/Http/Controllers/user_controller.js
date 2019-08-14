;
const bcrypt = require('bcrypt');
const config = require('../../../knexfile');
const jwt = require('jsonwebtoken');
const db = require('knex')(config['development']);

const getProviders = (req, res) => {
    db('persons.users').select('*').where('typeUser_id', "=", 4)
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
const getClients = (req, res) => {
    db('persons.users').select('*').where('typeUser_id', "=", 1)
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
const getAllUsers = (req, res) => {
    db('persons.users').select('*')
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
let registerUserAdmin = (req, res) => {
    let {first_name, last_name, address, gender_id,phone, nif, email, password} = req.body.params;
    let typeUser_id = req.body.typeUser_id || false;
if(typeUser_id==3 || typeUser_id==2){

    bcrypt.hash(password, 10, function (err, hash) {
            db('persons.users').insert({
                first_name,
                last_name,
                password: hash,
                email,
                phone,
                gender_id,
                typeUser_id,
                nif
            }).returning('id')
                .then(result => {
                    return res.status(200).json({
                        ok: true,
                        action: 'Insert',
                        id: result
                    })
                });

    });
    } else if(typeUser_id == 1|| typeUser_id==4){
    db('persons.users').insert({
        first_name,
        last_name,
        gender_id,
        typeUser_id,
        nif,
        phone,
        email
    }).returning('id')
        .then(result => {
            return res.status(200).json({
                ok: true,
                action: 'Insert',
                id: result
            })
        }).catch(function (err) {
        return res.status(500).json({
            message: 'Fallo al intentar insertar usuario.',
            data: err
        })
    });
    }
};
let loginUser = (req, res) => {
    let {password, email} = req.body.params;
    res.header('access-control-allow-origin', '*');
    db('persons.users').where({'email': email}).select(
        'password',
        'first_name',
        'last_name',
        'address',
        'phone',
        'typeUser_id',
        'id',
        'email',
        'nif')
        .then(result => {
            if (result.length === 1) {
                bcrypt.compare(password, result[0].password, (err, re) => {
                    if (re) {
                        let token;
                        if (result[0].typeUser_id == 3) {
                            token = jwt.sign({email, password}, 'my_secret_tokenAdmin');
                        } else {
                            token = jwt.sign({email, password}, 'my_secret_token');
                        }
                        return res.status(200).json({
                            message: 'Login Successfull',
                            response: {
                                'id': result[0].id,
                                'first_name': result[0].first_name,
                                'last_name': result[0].last_name,
                                'address': result[0].address,
                                'phone': result[0].phone,
                                'typeUser_id': result[0].typeUser_id,
                                'email': result[0].email,
                                'nif': result[0].nif
                            },
                            session_id: token
                        })
                    } else {
                        return res.status(500).json({
                            message: 'Incorrect password'
                        })
                    }
                });
            } else {
                return res.status(500).json({
                    message: 'User not found'
                })
            }
        }).catch(error => {
        console.log(error);
    });

};

let modifyUser = (req, res) => {
    let {first_name, last_name, address, gender_id,phone, nif, email, password} = req.body.params;
    let id= req.body.id || false;
    if(id){

        bcrypt.hash(password, 10, function (err, hash) {
            db('persons.users').update({
                first_name,
                last_name,
                password: hash,
                email,
                phone,
                gender_id,
                nif
            }).where('id','=',id).returning('id')
                .then(result => {
                    return res.status(200).json({
                        ok: true,
                        action: 'Modify',
                        id: result
                    })
                });

        });
    }

};

let deleteUser = (req, res) => {
    let id = req.body.id;
    db('persons.users').where('id', id).del().then(result => {
        return res.status(200).json({
            ok: true,
            action: 'Delete',
            id: result
        })
    });
};


module.exports = {
    //CRUD USERS
    loginUser,
    getProviders,
    getClients,
    getAllUsers,
    modifyUser,
    deleteUser,
    registerUserAdmin
};

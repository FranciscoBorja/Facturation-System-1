;
const bcrypt = require('bcrypt');
const config = require('../../../knexfile');
const jwt = require('jsonwebtoken');
const db = require('knex')(config['development']);

//CRUD USERS 
// let read = (req, res) => {
//     let campos = req.query.campos || '*',
//         tabla = req.query.table || 'users.client';
//     db.select(campos).from(table)
//         .then(response => {
//             return res.status(200).json({
//                 ok: true,
//                 data: response,
//                 message: `Found: ${response.length} records in the query`
//             })
//         }).catch(error => {
//         console.log(error);
//         return res.status(500).json({
//             ok: false,
//             data: null,
//             message: `Server Error: ${error}`
//         })
//     })
// };
const getEmployee = (req, res) => {
    db('persons.users').select('*').where('role_id', "=", 2)
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
    let {first_name, last_name, birth_date, gender_id, nick_name, email, password} = req.body.params;
    let role_id = req.body.role_id || false;


    bcrypt.hash(password, 10, function (err, hash) {
        if (role_id) {
            db('persons.users').insert({
                first_name,
                last_name,
                password: hash,
                email,
                gender_id,
                role_id,
                birth_date
            }).returning('id')
                .then(result => {
                    return res.status(200).json({
                        ok: true,
                        action: 'Insert',
                        id: result
                    })
                });
        } else {
            db('persons.users').insert({
                first_name,
                last_name,
                password: hash,
                email,
                nick_name,
                gender_id,
                birth_date,
                'role_id': 1
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
    });
};
let loginUser = (req, res) => {
    let {password, email} = req.body.params;
    res.header('access-control-allow-origin', '*');
    db('persons.users').where({'email': email}).select(
        'password',
        'first_name',
        'last_name',
        'address',
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
    let {first_name, last_name, birth_date, gender_id, nick_name, email, password, id} = req.body.params;
    let role_id = req.body.role_id || false;
    bcrypt.hash(password, 10, function (err, hash) {
        if (id) {
            if (role_id) {
                db('persons.users')
                    .where('id', '=', id)
                    .update({
                        first_name,
                        last_name,
                        password: hash,
                        email,
                        gender_id,
                        role_id,
                        birth_date,
                        card
                    }).then(function (result) {
                    return res.status(200).json({
                        ok: true,
                        action: 'Modify',
                        id: result
                    })
                }).catch(function (err) {
                    return res.send(err)
                });
            } else {
                db('persons.users')
                    .where('id', '=', id)
                    .update({
                        first_name,
                        last_name,
                        password: hash,
                        email,
                        nick_name,
                        birth_date,
                        gender_id
                    }).then(function (result) {
                    return res.status(200).json({
                        ok: true,
                        action: 'Modify',
                        id: result
                    })
                }).catch(function (err) {
                    return res.send(err)
                });
            }


        }
    });

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
    registerUser,
    getEmployee,
    getAllUsers,
    modifyUser,
    deleteUser,
    registerUserAdmin
};

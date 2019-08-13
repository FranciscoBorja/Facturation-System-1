;
const bcrypt = require('bcrypt');
const config = require('../../../knexfile');
jwt = require('jsonwebtoken');

let db = require('knex')(config['development']);
let hourUnused = true
//CRUD RESERVATIONS

let registerReservations = (req, res) => {
    let {user_id, hairdressers, sub_service_id, reservation_date, reservation_hour} = req.body.params;
    /* db('processes.reservations').select('reservations.hours').where('reservation_date' ,'=',reservation_date).then(hours=>{

         return res.status(200).json({
             hours: hours
         })
         console.log("enter",hours)
         for(let i=0; i<=result.length; i++){
             if(result[i]==reservation_hour){

             }
         }
     }).catch(err=>{
         return res.status(500).json({
             state: 'Failure',
             message: err
         })
     })
     if(hourUnused){*/
    db('processes.reservations').insert({
        user_id,
        sub_service_id,
        hairdressers,
        'state': 'Active',
        reservation_date,
        reservation_hour
    }).returning('id', 'reservation_date', 'reservation_hour')
        .then(result => {
            return res.status(200).json({
                ok: true,
                action: 'Insert',
                id: result
            })
        }).catch(err => {
        return res.status(403).json({
            state: 'Failure',
            message: err
        })
    });
    //}

};
let registerNotification = (req, res) => {
    let {user_id, reservation_id} = req.body.params
    db('processes.notifications').insert({
        'description': 'Desearia, que me anule esta reserva.',
        user_id,
        reservation_id,
        'state': 'Pendiente'
    }).returning('id').then(result => {
        return res.status(200).json({
            ok: true,
            action: 'Insert',
            id: result
        })
    }).catch(err => {
        return res.status(500).json({
            state: 'Failure',
            message: err
        })
    })


}
let updateNotification = (req, res) => {
    let {state, id} = req.body.params
    db('processes.notifications').update({
            state
        }
    ).where('id', '=', id).returning('id').then(result => {
        return res.status(200).json({
            ok: true,
            action: 'Modify',
            id: result
        })
    }).catch(err => {
        return res.status(500).json({
            state: 'Failure',
            message: err
        })
    })


}
let getReservations = (req, res) => {
    let user_id = req.body.user_id;
    db('processes.reservations').select('processes.reservations.id', 'processes.reservations.user_id', 'corporations.sub_services.name', 'corporations.sub_services.duration', 'processes.reservations.hairdressers', 'processes.reservations.created_at', 'processes.reservations.reservation_date', 'processes.reservations.reservation_hour', 'processes.reservations.state').innerJoin('corporations.sub_services', 'processes.reservations.sub_service_id', 'corporations.sub_services.id').where('user_id', '=', user_id)
        .then(result => {
            console.log(result)
            return res.status(200).json({
                data: result
            });
        });
};
let getNotifications = (req, res) => {
    let {user_id} = req.body.params;
    db('processes.notifications').select('processes.notifications.id', 'processes.notifications.description', 'persons.users.first_name', 'persons.users.last_name', 'processes.reservations.id', 'processes.notifications.state', 'processes.notifications.created_at', 'processes.reservations.reservation_date', 'processes.reservations.reservation_hour').innerJoin('processes.reservations', 'processes.notifications.reservation_id', 'processes.reservations.id').innerJoin('persons.users', 'processes.notifications.user_id', 'persons.users.id').where('processes.notifications.user_id', '=', user_id)
        .then(result => {
            console.log(result)
            return res.status(200).json({
                data: result
            });
        });
};
let getAllNotifications = (req, res) => {
    db('processes.notifications').select('processes.notifications.id', 'processes.reservations.user_id', 'processes.notifications.description', 'persons.users.first_name', 'persons.users.last_name', 'processes.reservations.id', 'processes.notifications.state', 'processes.notifications.created_at', 'processes.reservations.reservation_date', 'processes.reservations.reservation_hour').innerJoin('processes.reservations', 'processes.notifications.reservation_id', 'processes.reservations.id').innerJoin('persons.users', 'processes.notifications.user_id', 'persons.users.id')
        .then(result => {
            console.log(result)
            return res.status(200).json({
                data: result
            });
        });
};
let getAllReservations = (req, res) => {
    db('processes.reservations').select('processes.reservations.id', 'processes.reservations.user_id', 'corporations.sub_services.duration', 'corporations.sub_services.name', 'processes.reservations.hairdressers', 'processes.reservations.created_at', 'processes.reservations.reservation_date', 'processes.reservations.reservation_hour', 'processes.reservations.state').innerJoin('corporations.sub_services', 'processes.reservations.sub_service_id', 'corporations.sub_services.id')
        .then(result => {
            console.log(result)
            return res.status(200).json({
                data: result
            });
        });
};
let getUsedHours = (req, res) => {
    let reservation_date = req.body.reservation_date;
    let reservation_hour = req.body.reservation_hour;
    let count = 0;
    db('processes.reservations').select('reservation_hour').where('reservation_date', '=', reservation_date).then(result => {
        console.log("enter", result)
        result.forEach(element => {
            if (element.reservation_hour == reservation_hour) {
                return res.status(500).json({})
                count = 1

            }
            if (count !== 0) {
                return res.status(500).json({
                    message: "Hora Ocupada",
                })
            }


        })
    
    })
}
let updateReservations = (req, res) => {
    let id = req.body.id;
    db('processes.reservations')
        .where('id', '=', id)
        .update({
            user_id,
            service_id,
            reservation_date,
            reservation_hour
        }).then(function (result) {
        return res.status(200).json({
            ok: true,
            action: 'Modify',
            id: result
        })
    }).catch(function (err) {
        return res.send(err)
    });
};


let deleteReservations = (req, res) => {
    let id = req.body.id;
    db('processes.reservations').where('id', id).del().then(result => {
        return res.status(200).json({
            ok: true,
            action: 'Delete',
            id: result
        })
    }).catch(function (err) {
        return res.send(err)

    });
};


module.exports = {
    //CRUD RESERVATIONS
    registerReservations,
    getReservations,
    deleteReservations,
    updateReservations,
    getUsedHours,
    getAllReservations,
    getNotifications,
    getAllNotifications,
    registerNotification,
    updateNotification

};

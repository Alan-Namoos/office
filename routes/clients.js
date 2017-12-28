const express = require('express');
const router = express.Router();
const Client = require('../models/client');

// [GET]
router.get('/clients', function(req, res){
    Client.find().then(function(clients){
        res.render('clients', {
            pageTitle: 'Clients',
            pageID: 'clients',
            clients: clients
        });
    });
});

// [GET One]
router.get('/client/:id', function(req, res){
    Client.findById(req.params.id).then(function(client){
        res.render('client', {
            pageTitle: client.name.first,
            client: client
        });
    });
});

// [POST]
router.post('/clients', function(req, res){

    var clientCase = {
        case_type: req.body.case_type,
        case_number: req.body.case_number,
        case_priority: req.body.case_priority,   
        case_status: req.body.case_status
    };
    let newClient = new Client({
        name: {
            first: req.body.first_name,
            last: req.body.last_name
        },
        birthdate: req.body.birthdate,
        phone: req.body.phone,
        address: {
            home: req.body.home_address,
            work: req.body.work_address
        },
        email: {
            home: req.body.home_email,
            work: req.body.work_email
        },
        employment: req.body.employment,
        immigration_status: req.body.immigration_status,
        a_number: req.body.a_number,
        cases: [clientCase] 
    });  
    
    newClient.save(function(err, new_client){
        if (err) console.log('Error: -  ' + err);
        console.log('New Client:  ' + new_client);
        res.redirect('/');
    });
});

    // newUser.save(function(err, new_user){
    //     if (err) {
    //         console.log('Error: -  ' + err);
    //         res.send(err);
    //     }
    //     else {
    //         User.findOne({name: req.body.name}, function(err, user){
    //             console.log('Updated User:    ' + user.case[0].case_status);
    //             res.redirect('/users');
    //         });
            
    //     } 
    // });


// [PUT]
router.put('/users/:id', function(req, res){
    let userID = req.params.id;
    let updatedUser = req.body;
    User.findByIdAndUpdate(userID, updatedUser).then(function(userBeforeUpdate){
        User.findById(userBeforeUpdate._id).then(function(userAfterUpdate){
            res.send(userAfterUpdate);
        });
    });
});

// Display From already populated with User Data
router.get('/edit/user/:id', function(req, res){
    User.findById(req.params.id).then(function(user){
        res.render('edit', {
            pageTitle: 'Edit User: ' + user.name,
            user: user
        });
    });
});

// Update User data inside [POST] request from Form
router.post('/update/user/:id', function(req, res){
    let userID = req.params.id;
    let updatedUser = req.body;
    User.findByIdAndUpdate(userID, updatedUser).then(function(userBeforeUpdate){
        User.findById(userBeforeUpdate._id).then(function(userAfterUpdate){
            //res.send(userAfterUpdate);
            res.redirect('/user/' + userAfterUpdate._id);
           
        });
    });
});

// [DELETE] from inside [POST] request from From
router.post('/delete/user/:id', function(req, res){
    let userID = req.params.id;
    User.findByIdAndRemove(userID).then(function(deletedUser){
        res.redirect('/users');
    });
});

// [DELETE]
router.delete('/users/:id', function(req, res){
    let userID = req.params.id;
    User.findByIdAndRemove(userID).then(function(deletedUser){
        res.send(deletedUser);
    });
});

module.exports = router;
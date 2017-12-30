const express = require('express');
const router = express.Router();
const Client = require('../models/client');


// render One Client details & all related cases
router.get('/client/:id', function(req, res){
    Client.findById(req.params.id).then(function(client){
        res.render('client', {
            pageTitle: client.name.first,
            pageID: 'clientDetails',
            client: client
        });
    });
});

// render Add Client Form
router.get('/add/client', function(req, res){
    res.render('add-client', {
        pageTitle: 'Add Client',
        pageID: 'addClient'
    });
});

// SAVE New Client
router.post('/save/client', function(req, res){

    let caseFiles = {
        file_name: req.body.file_name,
        file_type: req.body.file_type,
        file_url: req.body.file_url
    };

    let clientCase = {
        case_type: req.body.case_type,
        case_number: req.body.case_number,
        case_priority: req.body.case_priority,   
        case_status: req.body.case_status,
        case_files: [caseFiles]
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


// render EDIT Client From - populated with Client Data
router.get('/edit/client/:id', function(req, res){
    Client.findById(req.params.id).then(function(client){
        res.render('edit-client', {
            pageTitle: 'Edit Client: ' + client.name.first,
            pageID: 'editClient',
            client: client
        });
    });
});

// UPDATE Client data coming from EDIT Form
router.post('/update/client/:id', function(req, res){
    let clientID = req.params.id;

    let updatedClient = {
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
        // cases: [clientCase] 
    };  
    
    Client.findByIdAndUpdate(clientID, updatedClient).then(function(clientBeforeUpdate){
        Client.findById(clientBeforeUpdate._id).then(function(clientAfterUpdate){
            //res.send(clientAfterUpdate);
            res.redirect('/client/' + clientAfterUpdate._id);
        });
    });
});

// [DELETE] from inside [POST] request from From
router.post('/delete/client/:id', function(req, res){
    let clientID = req.params.id;
    Client.findByIdAndRemove(clientID).then(function(deletedClient){
        res.redirect('/');
    });
});



module.exports = router;
const express = require('express');
const router = express.Router();
const User = require('../models/user');

// [GET]
router.get('/users', function(req, res){
    User.find().then(function(users){
        res.render('index', {
            users: users
        });
    });
});

// [GET One]
router.get('/users/:id', function(req, res){
    User.findById(req.params.id).then(function(user){
        res.render('user', {
            user: user
        });
    });
});

// [POST]
router.post('/users', function(req, res){
    let newUser = {
        name: req.body.name,
        age: req.body.age,
        email: req.body.email
    };

    User.create(newUser).then(function(user){
        res.redirect('/users');
    })
});

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
            res.redirect('/users');
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
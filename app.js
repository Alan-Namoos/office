const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Client = require('./models/client');
const app = express();
const PORT = process.env.PORT || 8080;

app.locals.siteName = 'Anzarouth Immigration';

// Mongoose Connection to mLab
mongoose.connect('mongodb://alan-namoos:zxc123asd@ds023098.mlab.com:23098/office', { useMongoClient: true });
mongoose.Promise = global.Promise;
let db = mongoose.connection;

// Check if DB is connected
db.once('open', function(){
    console.log('MongoDB Connected ...');
});

// Check for DB Errors
db.on('error', function(err){
    console.log(err.message);
});

// Middleware
// Middleware body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Middleware Morgan for Logging
app.use(morgan('dev'));

// Public Folder to serve static files
app.use(express.static('public'));

// Template Engine (ejs)
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Routes
app.use('/', require('./routes/clients'));

// Home Route
app.get('/', function(req,res){
    Client.find({}).then(function(clients){
        if (clients.length < 1 ){ 
            res.redirect('/clients');
            console.log('Empty');
        }
        res.render('index', {
            pageTitle: 'Home',
            pageID: 'home',
            clients: clients
        });
    });
    
});

// Server
app.listen(PORT, function(err){
    if(err){
        throw err;
    }
    console.log(`Listening on Port: ${PORT}`);
});

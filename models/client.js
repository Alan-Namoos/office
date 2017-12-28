const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fileSchema = new Schema({
    file_name: {
        type: String,
        defualt: 'Not Provided'
    },
    file_type: {
        type: String,
        defualt: 'Not Provided'
    },
    file_url: {
        type: String,
        default: 'Not Provided'
    },
    file_date: {
        type: Date,
        default: Date.now
    }
});

const caseSchema = new Schema({
    case_type: String,
    case_number: {
        type: String,
        default: 'Not Provided'
    },
    case_status: {
        type: String,
        default: 'Not Provided'
    },
    case_priority : {
        type: String,
        default: 'Default'
    },
    case_date_created: {
        type: Date,
        default: Date.now
    },
    case_files: [fileSchema]
    
});

const clientSchema = new Schema({
    name: {
        first: String,
        last:  String
    },
    birthdate: {
        type: String,
        default: 'Not Provided'
    },
    phone: {
        type: String,
        default: 'Not Provided'
    },
    address: {
        home: {
            type: String,
            default: 'Not Provided'
        },
        work: {
            type: String,
            default: 'Not Provided'
        },
    },
    email: {
        home: {
            type: String,
            default: 'Not Provided'
        },
        work: {
            type: String,
            default: 'Not Provided'
        },
    },
    photo: {
        type: String,
        default: 'Not Provided'
    },
    employment: {
        type: String,
        default: 'Not Provided'
    },
    immigration_status: {
        type: String,
        default: 'Not Provided'
    },
    a_number: {
        type: String,
        default: 'Not Provided'
    },
    date_created: {
        type: Date,
        default: Date.now
    },
    cases: [caseSchema]
});

// Create User Model
const Client = mongoose.model('client', clientSchema); // 'client' will be converted to 'clients' which is the name of the collection in mongodb
module.exports = Client;
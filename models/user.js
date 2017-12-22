const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Username is required']
    },
    age: Number,

    email: {
        type: String,
        required: [true, 'Email is required']
    }
});

// Create User Model
const User = mongoose.model('user', userSchema); // 'user' will be converted to users which is the name of the collection in mongodb
module.exports = User;
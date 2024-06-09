const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique : true
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }
    // course: {
    //     type: String,
    //     required: true
    // }
}, {timestamps : true})

// module.exports = {Users : mongoose.model('Users', userSchema, 'Users')};
module.exports = {
    Users : mongoose.model('Users', userSchema, 'Users'),
    Teacher: mongoose.model('Teacher', userSchema, 'Teachers'),
    Student: mongoose.model('Student', userSchema, 'Students')
};

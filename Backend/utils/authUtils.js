const mongoose = require('mongoose');
const { Teacher, Student } = require('../models/userModel');

async function isTeacher(email, password) {
    try {
        const user = await Teacher.findOne({ email: email, password: password });
        if(user) return true;
        else return false;
    } catch (error) {
        console.error('Error checking teacher:', error);
        return false; // Return false in case of an error
    }
}

async function isStudent(email, password) {
    try {
        const user = await Student.findOne({ email: email, password: password });
        if(user) return true;
        else return false;
    } catch (error) {
        console.error('Error checking teacher:', error);
        return false; // Return false in case of an error
    }
}

module.exports = { isTeacher, isStudent };
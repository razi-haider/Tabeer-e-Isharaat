const express = require('express')

const router = express.Router()

// Math button clicked -> takes you to teacher's math dashboard
router.get('/courses/math', (req, res) => {
    res.json({mssg: 'Welcome to Student\'s Math Dashboard'});
})

// English button clicked -> takes you to teacher's english dashboard
router.get('/courses/english', (req, res) => {
    res.json({mssg: 'Welcome to Student\'s English Dashboard'});
})

// Account button clicked -> route to the Student account screen
router.get('/account', (req, res) => {
    res.json({mssg: 'Welcome to Student\'s Account Settings'});
})

module.exports = router
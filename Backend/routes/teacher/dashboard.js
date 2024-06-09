const express = require('express')

const router = express.Router()

// Math button clicked -> takes you to teacher's math dashboard
router.get('/courses/math', (req, res) => {
    res.json({mssg: 'Welcome to Teacher\'s Math Dashboard'});
})

// literacy button clicked -> takes you to teacher's literacy dashboard
router.get('/courses/literacy', (req, res) => {
    res.json({mssg: 'Welcome to Teacher\'s literacy Dashboard'});
})

// Account button clicked -> route to the Teacher account screen
router.get('/account', (req, res) => {
    res.json({mssg: 'Welcome to Teacher\'s Account Settings'});
})

module.exports = router
const express = require('express')
const { 
    loginUser,
    getUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser
    }  = require('../controllers/userController');
const requireAuth = require("../middleware/requireAuth");

const router = express.Router()

// Login, Signup 
router.post('/login', loginUser);
router.post('/createUser/:type', createUser);

router.use(requireAuth); // protects all below routes unless user is authorized!

// Fetch and modify users
router.get('/', getUsers);
router.get('/getUser/:email', getUser);
router.delete('/deleteUser/:id', deleteUser);
router.patch('/updateUser/:id', updateUser);

module.exports = router
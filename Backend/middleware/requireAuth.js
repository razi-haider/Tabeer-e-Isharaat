const jwt = require('jsonwebtoken');
const { Teacher, Student, Users } = require('../models/userModel');

const requireAuth = async (req, res, next) => {
    // Verify authorization
    const { authorization } = req.headers;
    if(!authorization) {
        return res.status(400).json({error: 'Authorization token required!'}) 
    }

    const token = authorization.split(' ')[1];
    try {
        const _id = jwt.verify(token, process.env.SECRET);

        // IMPLEMENT for TEACHER too..
        req.user = await Users.findOne({ _id }).select('_id');
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({error: 'Request is not authorized!'});
    }
}

module.exports = requireAuth;
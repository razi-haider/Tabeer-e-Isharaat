const { Users, Teacher, Student } = require("../models/userModel"); // get the user Schema
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const validator = require("validator");

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            throw Error("All fields must be filled!");
        }

        if (!validator.isEmail(email)) {
            throw Error("Email is invalid!");
        }

        // Following is for 1 collection //
        let user = await Users.findOne({ email: email, password: password });
        if (!user) {
            throw Error("Invalid user credentials");
        }

        const token = createToken(user._id);
        // res.status(200).json({email, token});
        res
            .status(200)
            .json({ email: user.email, name: user.name, type: user.type, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// get all users
const getUsers = async (req, res) => {
    try {
        const users = await Users.find({ type: { $ne: "Admin" } }).select([
            "name",
            "email",
            "type",
        ]);
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getUser = async (req, res) => {
    const { email } = req.params;
    try {
        const user = await Users.findOne({ email: email });
        if (user) return res.status(200).json(user._id);
    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
};

// create a new user
const createUser = async (req, res) => {
    const { type } = req.params; // get user type from URL
    const { name, email, password } = req.body; // get all information of the user to be created from the request body

    // if invalid type given in URL, pop error and exit
    if (type != "Teacher" && type != "Student" && type != "Admin") {
        return res.status(404).json({ error: "No such user type exists" });
    }

    try {
        let user;
        user = await Users.create({ name, email, password, type });
        res.status(200).json(user); // send a json response of the created  user
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

// delete a user based on course and name coming from URL
const deleteUser = async (req, res) => {
    try {
        const {id} = req.params;
        // if(!mongoose.Types.ObjectId.isValid(id)) {
        //     return res.status(404).json({ error: "no such id" });
        // }
        const deletedUser = await Users.findOneAndDelete({_id: id});
        return res.status(200).json({ deletedUser });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

// update a user
const updateUser = async (req, res) => {
    // console.log(req.body);
    try {
        const {id} = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: "no such id" });
        }
        const updatedUser = await Users.findOneAndUpdate({_id: id}, {
            ...req.body
        });
        return res.status(200).json(updatedUser);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

// export all functions to routes/users.js
module.exports = {
    loginUser,
    getUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser,
};

const User  = require("../models/user.model");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;
const bcrypt = require("bcrypt");

module.exports = {
    register: async (req, res) => {
        try{
            const potentialUser = await User.findOne({email: req.body.email});
            if (potentialUser) {res.status(400).json({message: "This email already exists. Please login"})}
            else {
                const newUser = await User.create(req.body);
                const userToken = jwt.sign({id : newUser._id}, SECRET_KEY, {expiresIn: "2h"})
                res.status(201).cookie("userToken", userToken, {httpOnly: true, maxAge: 36000000}).json(newUser);
            }
        }
        catch(err){
            console.log(err);
            res.status(400).json(err)
        }
    },

    login: async (req, res) => {
        try{
            const user = await User.findOne({email: req.body.email})
            if (user) {
                const passwordsMatch = await bcrypt.compare(req.body.password, user.password)
                if (passwordsMatch){
                    const userToken = jwt.sign({id: user._id}, SECRET_KEY, {expiresIn: "2h"})
                    res.status(200).cookie("userToken", userToken, {httpOnly: true, maxAge: 3600000}).json(user)
                }
                else{
                    res.status(400).json({message: "Invalid email/password"})
                }   
            }
            else{
                res.status(400).json({message: "Invalid email/password"});
            }
        }
        catch(err){
            res.status(400).json(err);
        }
    },

    logout: (req, res) => {
        res.clearCookie("userToken")
        res.json({message: "logged out successfully"})
    },

    tokenIsValid: (req, res) => {
        jwt.verify(req.cookies.userToken, SECRET_KEY, (err, payload) => {
            if(err){
                res.status(401).json({verified: false});
            }
            else{
                res.json({verified: true});
            }
        })
    },

    getUser: (req, res) => {
        User.findById(req.body.user).populate("favorites")
            .then(user => res.json(user))
            .catch(err => res.status(400).json(err));
    },

}
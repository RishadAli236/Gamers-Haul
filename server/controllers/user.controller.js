const User  = require("../models/user.model")

module.exports = {
    // registerUser : (req, res) => {
    //     User.findOne({email: req.body.email})
    //         .then(potentialUser => {
    //             if (potentialUser) {res.status(400).json("This email already exists. Please login")}
    //             })
    //             User.create(req.body)
    //                     .then(newUser => res.json(newUser))
    //                     .catch(err => res.status(400).json(err))
    // }
    registerUser: async (req, res) => {
        try{
            const potentialUser = await User.findOne({email: req.body.email});
            if (potentialUser) {res.status(400).json("This email already exists. Please login")}
            else {
                const newUser = await User.create(req.body);
                res.json(newUser);
            }
        }
        catch(err){
            res.status(400).json(err)
        }
    }
}
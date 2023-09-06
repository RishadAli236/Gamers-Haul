const User  = require("../models/user.model")

module.exports = {
    registerUser : (req, res) => {
        User.create(req.body)
            .then(newUser => res.json(newUser))
            .catch(err => res.status(400).json(err))
    }
}
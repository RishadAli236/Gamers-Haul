const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY

//middleware to authenticate user when requests are made, if user is authenticated add the user ID to the 
//request object
module.exports.authenticate = (req, res, next) => {
    jwt.verify(req.cookies.userToken, SECRET_KEY, (err, payload) => {
        if(err){
            res.status(401).json({verified: false});
        }
        else{
            req.body.user = payload.id
            next();
        }
    })
}
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY

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
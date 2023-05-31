const jwt = require('jsonwebtoken');
const User = require('../model/User.js');
const cookies = require('cookie-parser');


const TokenAuth = (req,res,next) => {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            message: 'Bearer token missing or invalid',
        });
    }

    const token = authorizationHeader.split(' ')[1];
    if (token) {
        jwt.verify(token, 'secret_key', async(err,token) => {
            if (err) {
                res.status(401).json({
                    success: false, 
                    message: "Invalid token"
                })
            }

            else {
                let currentUser = await User.findById({_id:token.id});
                res.locals.currentUser = currentUser;
                next();
            }
        })
    }

    else {
        res.status(501).json({
            success: false,
            message: "Access denied"
        })
    }
}

module.exports = {TokenAuth};
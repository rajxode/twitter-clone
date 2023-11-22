// getting user data
const User = require('../models/User');
// jwt for token
const jwt = require('jsonwebtoken');


// to check whether user is loggedin or not
exports.isLoggedIn = async( req,res,next) => {
    try {
        if(!req.header){
            return res.status(401).json({
                error:'Unauthorized'
            });
        }
    
        // getting the value of token from cookies / header
        const token = await req.header("Authorization").replace('Bearer ','') ;
    
        if(!token || token === 'null' ){
            return res.status(401).json({
                error:'Unauthorized'
            });
        }
    
        // if token found 
        // decode it to get the values stored inside the token
        const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        // find user from value of id inside the decoded JWT token
        // store the user inside req
        req.user = await User.findById(decode.id);
    
        // call the next operation
        next();   
    } catch (err) {
        if (err instanceof jwt.TokenExpiredError || err instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({
                error: 'Token expired, Please SignIn again'
            });
        }
        return res.status(400).json({
            error:err.message
        })
    }
};
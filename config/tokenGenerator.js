const jwt = require('jsonwebtoken');

const tokenGenerator=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET_KEY,{
        expiresIn: "3hr",
    });
};

module.exports = tokenGenerator;
const jwt = require("jsonwebtoken");
const { secretKey } = require("../configuration/jwtConfig");
console.log("Generation secret key:", secretKey.substring(0, 10) + "...");


function generateToken(user) {
    const payload = {
        id:user._id,
        email:user.email,
        role: user.role
    }
    return jwt.sign(payload,secretKey,{expiresIn:"1h"});
}

module.exports = {
    generateToken
}
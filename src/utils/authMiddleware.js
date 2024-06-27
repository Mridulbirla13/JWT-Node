const jwt = require("jsonwebtoken");
const { secretKey } = require("../configuration/jwtConfig");
console.log("Verification secret key:", secretKey.substring(0, 10) + "...");

function authenticateToken(req, res, next){
    const authHeader = req.header("Authorization");
    if(!authHeader){
        res.status(401).json({
            message: "Unauthorized: Missing token!"
        });
    }
    const [bearer, token] = authHeader.split(" ");
    if(bearer !== "Bearer" || !token){
        return res.status(401).json({
            message: "Unauthorized: Invalid token format"
        })
    }
    jwt.verify(token,secretKey,(err,user)=>{
        try {
            const decoded = jwt.decode(token, { complete: true });
            console.log("Decoded token header:", decoded.header);
            console.log("Decoded token payload:", decoded.payload);

            const user = jwt.verify(token, secretKey);
            req.user = user;
            next();
          } catch (error) {
            console.log("Secret Key:", secretKey);
            console.error("Token verification error:", error);
            return res.status(403).json({
              message: "Forbidden: Invalid Token",
              error: error.message
            });
          }
    })
}

function verifyToken(token){
    return jwt.verify(token, secretKey)
}

module.exports = {
    authenticateToken,
    verifyToken
}
require('dotenv').config();
const jwt = require('jsonwebtoken');

const authMiddleware = (req,res,next)=>{
    const authHeader = req.headers["authorization"];
    // console.log(authHeader);
    const token = authHeader && authHeader.split(" ")[1];
    if(!token){
        return res.status(401).json({
            success : false,
            message : 'Access denined, No token provided. please login to continue.'
        })
    }

    //decode this token
    try{
        const decodeTokenInfo = jwt.verify(token,process.env.JWT_SECRET_KEY);
        console.log(decodeTokenInfo);

        req.userInfo = decodeTokenInfo;
        next();
    }catch(e){
        console.log(e);
        return res.status(500).json({
            success : false,
            message : 'token expired, login again.'
        })
    }
}

module.exports = authMiddleware;
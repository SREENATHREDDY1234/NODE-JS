require('dotenv').config();
const jwt = require('jsonwebtoken');

const authMiddleware = (req,res,next)=>{
    const authHeader = req.headers["authorization"];
    console.log(authHeader);
    const token = authHeader && authHeader.split(" ")[1];
    if(!token){
        res.status(401).json({
            success : false,
            message : "please provide the token."
        })
    }

    //decode the token
    try{
        const usertokendetails = jwt.verify(token,process.env.JWT_SECREAT_KEY);
        console.log(usertokendetails);

        req.userInfo=usertokendetails;
        next();
    }catch(e){
        console.log(e);
        return res.status(500).json({
            success : false,
            message : 'some error occured. in decode please try again.'
        })
    }
}

module.exports = authMiddleware;
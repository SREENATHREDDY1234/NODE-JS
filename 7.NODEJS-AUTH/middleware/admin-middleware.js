

const isAdminUser = (req,res,next)=>{
    if(req.userInfo.role !== 'admin'){
        return res.json({
            success : false,
            message : 'Access denined! Admin rights required.'
        })
    }
    next();
}

module.exports = isAdminUser;
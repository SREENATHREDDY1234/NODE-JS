
const isadmin = (req,res,next)=>{
    console.log(req.userInfo);
    if(req.userInfo.role === 'admin'){
        next();
    }else{
        return res.status(400).json({
            success:true,
            message : 'normal user cannot use this page. Admin rights required.'
        })
    }
    
}

module.exports = isadmin;
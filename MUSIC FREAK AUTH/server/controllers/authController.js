import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js'
import 'dotenv/config'
export const register = async(req,res)=>{
    const {name,email,password} = req.body;
    if(!name || !email || !password){
        return res.status(400).json({
            success : false,
            message : "Missing Details"
        })
    }

    try{
        const exsistingUser = await userModel.findOne({email});
        if(exsistingUser){
            return res.json({
                success : false,
                message : "User already exists."
            })
        }
        const hashedPassword = await bcrypt.hash(password,10);

        const user = await userModel.create({
            name,
            email,
            password : hashedPassword
        })

        const token = jwt.sign({id: user._id},process.env.JWT_SECRET,{expiresIn:'7d'});

        res.cookie('token',token,{
            httpOnly : true,
            secure : process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production'? 'none' : 'strict',
            maxAge: 7*24*60*60*1000
        })

        return res.json({success:true});

    }catch(e){
        return res.json({
            success : false,
            message : e.message
        })
    }
}


export const login = async(req ,res)=>{
    const {email,password}=req.body;

    if(!email || !password){
        return res.json({
            success:false,
            message:"email and password are required."
        })
    }

    try{

        const user = await userModel.findOne({email});
        if(!user){
            return res.json({
                success:false,
                message:"user is not found"
            })
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.json({
                success:false,
                message:"Password is incorrect."
            })
        }

        const token = jwt.sign({id: user._id},process.env.JWT_SECRET,{expiresIn:'7d'});

        res.cookie('token',token,{
            httpOnly : true,
            secure : process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production'? 'none' : 'strict',
            maxAge: 7*24*60*60*1000
        })

        return res.json({
            success:true,
            message:"login successful"
        })
    }catch(e){
        return res.json({
            success : false,
            message : e.message
        })
    }
}

export const logout = async(req ,res)=>{
    try{
        res.clearCookie('token',{
            httpOnly : true,
            secure : process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production'? 'none' : 'strict',
            maxAge: 7*24*60*60*1000
        })

        return res.json({
            success:true,
            message:"logged Out",
        })
    }catch(e){
         return res.json({
            success : false,
            message : e.message
        })
    }
}
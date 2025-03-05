require('dotenv').config();
const bcrypt = require('bcryptjs')
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const registerUser = async (req,res)=>{
    try{
        const {username,email,password,role} = req.body;

        //find if the username and email already exists in db
        const currentUser = await User.findOne({$or : [{username},{email}]})
        if(currentUser){
            return res.status(400).json({
                success : false,
                message : 'user already exists. please login.',
                user : currentUser
            })
        }

        const salt =  bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password,salt);

        const newUser = await User.create({
            username:username,
            email:email,
            password : hashPassword,
            role : role || 'user',
        })
        if(newUser){
            res.status(201).json({
                success : true,
                message : 'user added successfully',
                user : newUser
            })
        }else{
            res.status(500).json({
                success : false,
                message : 'user registration is unsuccessful please try again later',
            })
        }
    }catch(e){
        console.log('resgister error : ',e)
        res.status(500).json({
            sucess : false,
            message : 'something error. please try again.'
        })
    }    
}

const loginUser = async (req,res)=>{
    try{
        const {username,password} = req.body;

        //check if the username is exists in db or not.
        const currentUser = await User.findOne({username});

        if(!currentUser){
            return res.status(400).json({
                success : false,
                message : "invalid Credentials, try again"
            })
        }

        //if username matches then check the password is match or not.
        const ispassMatch = bcrypt.compareSync(password,currentUser.password);

        if(!ispassMatch){
            return res.status(400).json({
                success : false,
                message : "password is incorrect."
            })
        }

        const usertoken = jwt.sign({
            userId : currentUser._id,
            username : currentUser.username,
            role : currentUser.role
        },process.env.JWT_SECREAT_KEY,
        {expiresIn : '1h'})

        res.status(200).json({
            success : true,
            message : 'logged in successfully.',
            token : usertoken
        })

    }catch(e){
        console.log('login error : ',e)
        res.status(500).json({
            sucess : false,
            message : 'something error.in login please try again.'
        })
    }
}

module.exports = {loginUser,registerUser};
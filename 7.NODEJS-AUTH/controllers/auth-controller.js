require('dotenv').config()
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//register controller
const registerUser = async(req,res)=>{
    try{
        //extract user information from our request body
        const {username,email,password,role} = req.body;

        //check if the user is already exists in our database
        const checkExistingUser = await User.findOne({$or:[{username},{email}]});
        if(checkExistingUser){
            return res.status(400).json({
                success : false,
                message : 'User is already exists. Please Login or try with different username or password.'
            });
        }

        //hash the user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        //create a newuser and save in our database
        const newlyCreatedUser = await User.create({
            username,
            email,
            password : hashedPassword,
            role : role || 'user',
        })

        if(newlyCreatedUser){
            res.status(201).json({
                success:true,
                message : 'User registered successfully',
                user : newlyCreatedUser
            })
        }else{
            res.status(400).json({
                success:false,
                message : 'Unable to register user please try again.'
            })
        }

    }catch(e){
        console.log(e);
        res.status(500).json({
            success : false,
            message : 'Something went wrong! please try again',
        })
    }
}

//login controller
const loginUser = async(req,res)=>{
    try{
        const {username,password} = req.body;

        //find if the current user is exists in database or not
        const user = await User.findOne({username});

        if(!user){
            res.status(400).json({
                success:false,
                message : 'User name is not found'
            })
        }
        
        //If username is found now its time to check for password match
        const isPasswordMatch = await bcrypt.compare(password,user.password);
        if(!isPasswordMatch){
            res.status(400).json({
                success:false,
                message :'Password is incorrect'
            })
        }

        //create user token
        const accessToken = jwt.sign({
            userId : user._id,
            username : user.username,
            role : user.role
        },process.env.JWT_SECRET_KEY,
        {
            expiresIn : '1h'
        })

        res.status(200).json({
            success : true,
            message : 'Logged in successful',
            accessToken
        })

    }catch(e){
        console.log(e);
        res.status(500).json({
            success : false,
            message : 'Something went wrong! please try again',
        })
    }
}

const changePassword = async(req,res)=>{
    try{
        const userId = req.userInfo.userId;

        //extract old and new password;
        const {oldPass,newPass} = req.body;

        //find the current logged in user
        const user = await User.findById(userId);

        if(!user){
            return res.status(400).json({
                success : false,
                message : "User not found."
            })
        }

        //check if old pass is correct or not.
        const isPasswordMatch = await bcrypt.compare(oldPass,user.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                success : false,
                message : "Password is incorrect. please provide correct password."
            })
        }

        //hash the new password and update in database.
        const salt = bcrypt.genSaltSync(10);
        const newHashedPassword = await bcrypt.hash(newPass,salt);

        // await User.findByIdAndUpdate(userId,{$set : {password:newHashedPassword}});
        user.password = newHashedPassword;
        await user.save();

        res.status(200).json({
            success : true,
            message : "password changed successfully."
        })

    }catch(e){
        console.log("Error while password changing : ",e);
        res.status(500).json({
            success : false,
            message : 'Something went wrong! please try again',
        })
    }
}

module.exports = {registerUser,loginUser,changePassword};
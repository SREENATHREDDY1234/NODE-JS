const mongoose  = require('mongoose');

mongoose.connect('mongodb+srv://sreenathreddy:sreen7201@cluster0.wty1u.mongodb.net/cluster0')
.then(()=>console.log('database connected successfully.'))
.catch((e)=>{console.log("problem Occurred",e)});

const userSchema = new mongoose.Schema({
    name : String,
    email : String,
    age : Number,
    isActive : Boolean,
    tags : [String],
    createdAt : {type : Date, default : Date.now}
});

//create user model
const User = mongoose.model('User',userSchema);

async function runQueryExamples(){
    try{
        //create a new User
        //method 1
        // const newUser = await User.create({
        //     name : "Hardik Chavan",
        //     email : "hardikchavan49@gmail.com",
        //     age : 19,
        //     isActive : false,
        //     tags : ['Athelet','student'],
        // })

        //method 2
        // const newUser = new User({
        //     name : "killer ",
        //     email : "killer123@gmail.com",
        //     age : 25,
        //     isActive : true,
        //     tags : ['explorer','student'],
        // })
        // await newUser.save();
        // console.log('Created new user ',newUser);
        
        // read all Users
        // const allUsers = await User.find({});
        // console.log(allUsers);
       
        //read specific person
        // const getAllUsersOfActiveTrue = await User.find({isActive: true});
        // const getOneUserOfActiveTrue = await User.findOne({isActive: true});
        // const getUserByUserId = await User.findById("67a7469625c33462bfa80538");
        // const getSelectedFields = await User.find({name:'Sreenath'}).select("name email -_id");
        // const limitedUsers = await User.find().limit(3).skip(1);
        // const sortedUsers = await User.find().sort({age:-1});
        // const countDocuments = await User.countDocuments({isActive:true});

        // console.log(getAllUsersOfActiveTrue);
        // console.log(getOneUserOfActiveTrue);
        // console.log(getUserByUserId);
        // console.log(getSelectedFields);
        // console.log(limitedUsers);
        // console.log(sortedUsers);
        // console.log(countDocuments);
        
        //  const newUser = await User.create({
        //     name : "Delete User",
        //     email : "delete@gmail.com",
        //     age : 19,
        //     isActive : false,
        //     tags : ['Athelet','student'],
        // })
        // console.log("User added Successfully",newUser);
        
        //delete operation
        // const deleteUser = await User.findByIdAndDelete('67a822782d6b4134ebaaa460');
        // console.log("User deleted Successfully",deleteUser);

        // const deleteUser = await User.findOneAndDelete({name:"Delete User"});
        // console.log("User deleted Successfully",deleteUser);
        
        //  const newUser = await User.create({
        //     name : "Update User",
        //     email : "Update@gmail.com",
        //     age : 19,
        //     isActive : false,
        //     tags : ['Athelet','student'],
        // })
        // console.log("User added Successfully",newUser);

        //update user;
        // const updateUser = await User.findByIdAndUpdate('67a82897a5c5b24a9f297779',{
        //     $set : {age:18,name:"karthik sai",email:"karthiksai@gmail.com" },
        //     $push: {tags : 'updated'}
        // },{new:true});
        // console.log("updated user",updateUser);
        
        

    }catch(e){
        console.log('Error ->',e);
    }finally{
        await mongoose.connection.close();
    }
}

runQueryExamples();
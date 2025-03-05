const mongoose  = require('mongoose');

const connectToDB = async()=>{
    mongoose.connect('mongodb+srv://sreenathreddy:sreen7201@cluster0.wty1u.mongodb.net/cluster0')
    .then(()=>console.log('database connected successfully.'))
    .catch((e)=>{console.log("problem Occurred",e)});
}


module.exports = connectToDB;
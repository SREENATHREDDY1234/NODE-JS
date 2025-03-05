const cloudinary = require('../config/cloudinary');


const uploadToCloudinary = async (filePath)=>{
    try{

        const result = await cloudinary.uploader.upload(filePath);

        // console.log(result);
        return {
            url : result.secure_url,
            publicId : result.public_id
        }
    }catch(e){
        console.log("Error while uploading to cloudinary.");
        throw new Error("Error while uploading to cloudinary.");
    }
}

module.exports = {uploadToCloudinary};
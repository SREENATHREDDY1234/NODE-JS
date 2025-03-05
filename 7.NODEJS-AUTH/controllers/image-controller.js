const Image = require('../models/image');
const {uploadToCloudinary }= require('../helpers/cloudinary-healper');
const fs = require('fs');
const cloudinary = require('../config/cloudinary');

const uploadImage = async(req,res)=>{
    try{

        // console.log("Request Body:", req.body);
        // console.log('Uploaded File:', req.file);
        //check if file is missing in rerq object
        if(!req.file){
            return res.status(400).json({
                success : false,
                message : 'File is required. please upload an image.'
            })
        }

        const {url,publicId} = await uploadToCloudinary(req.file.path);

        //store the image url and public id along with the uploaded user id in main database
        const newlyUploadedImage = await Image.create({
            url,
            publicId,
            uploadedBy : req.userInfo.userId
        })

        //delete the file from local storage
        fs.unlinkSync(req.file.path);

        res.status(201).json({
            success : true,
            message : 'Imaged uploaded successfully',
            image : newlyUploadedImage
        })

    }catch(e){
        console.log(e);
        res.status(500).json({
            suceess:false,
            message : 'Something went wrong please try again.'
        })
    }
}

const fetchImagesController = async(req,res)=>{
    try{
        const page = parseInt(req.query.page)||1;
        const limit = parseInt(req.query.limit)||5;
        const skip = parseInt(page-1)*limit;

        const sortBy = req.query.sortBy || 'createdAt';
        const sortOrder = req.query.sortOrder === 'asc'? 1 : -1;
        const totalImages = await Image.countDocuments();
        const totalPage = Math.ceil(totalImages/limit);
        const sortObj = {};
        sortObj[sortBy] = sortOrder;

        const images = await Image.find().sort(sortObj).skip(skip).limit(limit);


        if(images){
            res.status(200).json({
                success:true,
                message:"images fectched successfully.",
                currentPage : page,
                totalPages : totalPage,
                totalImages : totalImages,
                data : images
            })
        }
    }catch(e){
        console.log("Error in fectech image : ",e);
        res.status(500).json({
            success : false,
            message : "failed in fecting images.Try again."
        })
    }
}

const deleteImageController = async(req,res)=>{
    try{

        const imageId = req.params.id;
        const userId = req.userInfo.userId;

        //check if the Image is present in db or not.
        const currentImage = await Image.findById(imageId);
        if(!currentImage){
            return res.status(404).json({
                success : false,
                message : "image with given id is not found. Try with different Id."
            })
        }

        if(userId !== currentImage.uploadedBy.toString()){
            console.log(userId,"   ",currentImage.uploadedBy.toString())
            return res.status(400).json({
                success : false,
                message : "Image can be deleted by uploaded User Only."
            })
        }

        //delete this image first from your cloudinary storage.
        await cloudinary.uploader.destroy(currentImage.publicId);

        //delete this image from database.
        const deleteImage = await Image.findByIdAndDelete(imageId);

        res.status(200).json({
            success : 'true',
            message : 'image deleted successfully.'
        })

    }catch(e){
        console.log("Error in deleting image : ",e);
        res.status(500).json({
            success : false,
            message : "failed in delete image.Try again."
        })
    }
}

module.exports = {uploadImage,fetchImagesController,deleteImageController};
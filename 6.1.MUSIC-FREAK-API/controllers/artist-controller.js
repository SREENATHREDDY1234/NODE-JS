const Artist = require('../models/artist.js');

const getAllArtistDetails = async(req,res)=>{
    try{
        const artistDetails = await Artist.find({});
        if(artistDetails.length>0){
            res.status(200).json({
                success:true,
                message:"Artist Details Fectched Successfully",
                artistsDetails : artistDetails
            })
        }else{
            res.status(404).json({
                success:false,
                message:"no details found",
            })
        }
    }catch(e){
        console.log(e);
        res.status(500).json({
            success:false,
            message:"some error occurred please try again later."
        })
    }
}

const getArtistDetailsById = async (req,res)=>{
    try{
        const artistId = req.params.id;
        const artistDetails = await Artist.findById(artistId);
        if(!artistDetails){
            res.status(404).json({
                success:false,
                message:"no details found",
            })
        }else{
            res.status(200).json({
                success:true,
                message:"Artist Details Fectched Successfully",
                artistsDetails : artistDetails
            })
        }
    }catch(e){
        console.log(e);
        res.status(500).json({
            success:false,
            message:"some error occurred please try again later."
        })
    }
}

const addNewArtist = async(req,res)=>{
     try{
        const newArtistData = req.body;
        const newlyaddedArtist = await Artist.create(newArtistData);
        if(newlyaddedArtist){
            res.status(201).json({
                success : true,
                message : 'Artist Added',
                data : newlyaddedArtist,
            })
        }
        console.log("Artist added successfully");
    }catch(e){
        console.log(e);
        res.status(500).json({
            success:false,
            message:"some error occurred please try again later."
        })
    }
}

const updateArtistById = async(req,res)=>{
     try{
        const artistId = req.params.id;
        const updatedDetails = req.body;
        const newDetails = await Artist.findByIdAndUpdate(artistId,updatedDetails,{new : true})
        if(!newDetails){
            res.status(404).json({
                success:false,
                message:"Id is not found Please try with different Id",
            })
        }else{
            res.status(200).json({
                success:true,
                message:"Artist Details Fectched Successfully",
                updatedDetails : newDetails
            })
        }

    }catch(e){
        console.log(e);
        res.status(500).json({
            success:false,
            message:"some error occurred please try again later."
        })
    }
}

const deleteArtistById = async(req,res)=>{
     try{
        const artistId = req.params.id;
        const deletedArtist = await Artist.findByIdAndDelete(artistId);
        if(!deletedArtist){
            res.status(404).json({
                success:false,
                message:"Id is not found Please try with different Id",
            })
        }else{
            res.status(200).json({
                success:true,
                message:"Artist Data is deleted successfully",
                DeletedArtistDetails : deletedArtist
            })
        }
    }catch(e){
        console.log(e);
        res.status(500).json({
            success:false,
            message:"some error occurred please try again later."
        })
    }
}

module.exports = {getAllArtistDetails,getArtistDetailsById,addNewArtist,updateArtistById,deleteArtistById}
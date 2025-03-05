const Book = require('../models/Book.js');

const getAllBooks = async(req,res)=>{
    try{
        const allBooks = await Book.find();
        if(allBooks.length>0){
            res.status(200).json({
                success : true,
                message : "Books Fectched Successfully",
                Books : allBooks
            })
        }else{
            res.status(404).json({
                success:false,
                message:"No Books are found in Database"
            })
        }
    }catch(e){
        console.log(e);
        res.status(500).json({
            success:false,
            message:"Something went wrong Please try again later."
        })
    }
}

const getSingleBookById = async(req,res)=>{
     try{
        const getCurrentBookId = req.params.id;
        const bookDetailsById = await Book.findById(getCurrentBookId);
        if(!bookDetailsById){
            res.status(404).json({
                success:false,
                message:`No Book is found in Database with Id ${getCurrentBookId}`
            })
        }else{
            res.status(200).json({
                success : true,
                message : "Book Details Fectched Successfully",
                Books : bookDetailsById
            })
        }
    }catch(e){
        console.log(e);
        res.status(500).json({
            success:false,
            message:"Something went wrong Please try again later."
        })
    }
}

const addNewBook = async(req,res)=>{
    try{
        const newBookFormData = req.body;
        const newlyCreatedBook = await Book.create(newBookFormData);
        if(newBookFormData){
            res.status(201).json({
                success : true,
                message : 'Book added',
                data : newlyCreatedBook,
            })
        }
        console.log("book added successfully");
    }catch(e){
        console.log(e);
        res.status(500).json({
            success:false,
            message:"Something went wrong Please try again later."
        })
    }
}

const updateBook = async(req,res)=>{
    try{
        const getCurrentBookId = req.params.id;
        const updatedBookFormData = req.body;
        const updatedBook = await Book.findByIdAndUpdate(getCurrentBookId,updatedBookFormData,{new : true})
        if(!updatedBook){
            res.status(404).json({
                success:false,
                message:"Book with given Id is not found. Try again with different id",
            })
        }else{
            res.status(200).json({
                success : true,
                message : "Book updated Successfully",
                UpdatedBook : updatedBook
            })
        }
    }catch(e){
        console.log(e);
        res.status(500).json({
            success:false,
            message:"Something went wrong Please try again later."
        })
    }
}

const deleteBook = async(req,res)=>{
    try{
        const getCurrentBookId = req.params.id;
        const deletedBook = await Book.findByIdAndDelete(getCurrentBookId);
        if(!deletedBook){
            res.status(404).json({
                success:false,
                message:"Book with given Id is not found. Try again with different id",
            })
        }else{
            res.status(200).json({
                success : true,
                message : "Book deleted Successfully",
                DeletedBook : deletedBook
            })
        }
    }catch(e){
         console.log(e);
        res.status(500).json({
            success:false,
            message:"Something went wrong Please try again later."
        })
    }
}

module.exports = {
    getAllBooks,
    getSingleBookById,
    addNewBook,
    updateBook,
    deleteBook
}
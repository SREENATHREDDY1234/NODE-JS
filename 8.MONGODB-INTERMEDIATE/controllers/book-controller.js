const Author = require('../models/author');
const Book = require('../models/book');

const createAuthor = async(req ,res)=>{
    try{
        const author = await Author.create(req.body);
        res.status(201).json({
            success : true,
            data : author,
        })
    }catch(e){
        console.log("Error while creating Author : ",e);
        res.staus(500).json({
            success : false,
            message : 'something went wrong. please try again.'
        })
    }
}

const createBook = async(req ,res)=>{
    try{
        const book = await Book.create(req.body)
        res.status(201).json({
            success : true,
            data : book,
        })
    }catch(e){
        console.log("Error while creating Book : ",e);
        res.staus(500).json({
            success : false,
            message : 'something went wrong. please try again.'
        })
    }
}

const getBookWithAuthor = async(req,res)=>{
    try{
        // const bookId = req.params.id;
        // const book = await Book.findById(bookId);
        // if(!book){
        //     return res.status(404).json({
        //         success:false,
        //         message : "no book is found with given id."
        //     })
        // }
        // const authorId = book.author;
        // const author = await Author.findById(authorId);
        // if(!author){
        //     return res.status(404).json({
        //         success : false,
        //         message : "author is not found."
        //     })
        // }

        // res.status(200).json({
        //     success:true,
        //     book_details : book,
        //     author_details : author, 
        // })

        const book = await Book.findById(req.params.id).populate('author');
        if(!book){
            return res.status(404).json({
                success:false,
                message : "no book is found with given id."
            })
        }
        res.status(200).json({
            success:true,
            book_details : book,
        })
    }catch(e){
        console.log("Error while get book by author : ",e);
        res.status(500).json({
            success : false,
            message : 'something went wrong. please try again.'
        })
    }
}

module.exports = {createAuthor,createBook,getBookWithAuthor};
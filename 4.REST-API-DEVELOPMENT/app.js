const express = require('express')
const app = express();

//built in middleware
app.use(express.json());

let books = [
    {
        id : '1',
        title : 'Book 1'
    },
    {
        id : '2',
        title : 'Book 2'
    },
    {
        id : '3',
        title : 'Book 3'
    }
]

//get all books
app.get('/',(req,res)=>{
    res.json({
        message:"Welcome to our booksstore api",
    })
})

app.get('/get',(req,res)=>{
    res.json(books);
})

app.get('/get/:id',(req,res)=>{
    const book = books.find(book=>book.id == req.params.id);
    if(book){
        res.status(200).json(book);
    }else{
        res.status(404).json({message:"Book is not found. Try  with diiferent book id"});
    }
})

//add a new book
app.post('/add',(req,res)=>{
    const newBook = {
        id : books.length+1,
        title : `Book ${books.length+1}`
    }
    books.push(newBook)
    res.status(200).json({
        data:newBook,
        message:"Book added successfully"
    });
})

//update a book
app.put('/update/:id',(req,res)=>{
    const findCurrentBook = books.find(book=>book.id == req.params.id);

    if(findCurrentBook){
        findCurrentBook.title = req.body.title || findCurrentBook.title;

        res.status(200).json({
            message : `Book with Id ${req.params.id} updated successfully`,
            data : findCurrentBook
        });
    }else{
        res.status(404).json({
            message : `Book with Id ${req.params.id} is not found. try with differnt Id`,
        })
    }
})

//Delete a Book
app.delete('/delete/:id',(req,res)=>{
    const findCurrentBook = books.findIndex(book=>book.id == req.params.id);
    if(findCurrentBook !== -1){
        const deleteBook = books.splice(findCurrentBook,1);
        res.status(200).json({
            "message" :  `Book with Id ${req.params.id} deleted successfully`,
            "deletedBook" : deleteBook[0]
        })
    }else{
        res.status(404).json({
            message : `Book with Id ${req.params.id} is not found. try with differnt Id`,
        })
    }
})

app.listen(3000,()=>{
    console.log(`server is running in http://localhost:3000/`)
})
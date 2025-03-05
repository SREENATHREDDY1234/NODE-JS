const express = require('express');
const {createAuthor,createBook,getBookWithAuthor} = require('../controllers/book-controller');

const router = express.Router();
router.post('/author',createAuthor);
router.post('/book',createBook);
router.get('/getbook/:id',getBookWithAuthor);

module.exports = router;
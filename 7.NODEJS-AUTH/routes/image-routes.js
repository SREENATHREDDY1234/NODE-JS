const express = require('express')
const authMiddleware = require('../middleware/auth-middleware');
const adminMiddleware = require('../middleware/admin-middleware');
const uploadMiddleware = require('../middleware/upload-middleware')
const {uploadImage,fetchImagesController,deleteImageController} = require('../controllers/image-controller');

const router = express.Router()

//upload the image
router.post('/upload',authMiddleware,adminMiddleware,uploadMiddleware.single('image'),uploadImage);
router.get('/get',authMiddleware,fetchImagesController);
router.delete('/delete/:id',authMiddleware,adminMiddleware,deleteImageController);

//to get all the images

module.exports = router;
const express = require('express');
const {getAllArtistDetails,getArtistDetailsById,addNewArtist,updateArtistById,deleteArtistById} = require('../controllers/artist-controller');
const AdminMiddleware = require('../middleware/admin_middleware');
const AuthMiddleware = require('../middleware/auth_middleware');
const Router = express.Router();

Router.get('/get',AuthMiddleware,getAllArtistDetails);
Router.get('/get/:id',AuthMiddleware,getArtistDetailsById);
Router.post('/add',AuthMiddleware,AdminMiddleware,addNewArtist);
Router.put('/update/:id',AuthMiddleware,AdminMiddleware,updateArtistById);
Router.delete('/delete/:id',AuthMiddleware,AdminMiddleware,deleteArtistById);

module.exports = Router;
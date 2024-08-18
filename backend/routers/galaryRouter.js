const express = require('express');
const { uploadImage ,getAllImages, deleteImage} = require('../controllers/galaryController');
const router = express.Router();
const multer = require('multer')
const storage = multer.memoryStorage();
const upload = multer({storage:storage})



router.post('/upload',upload.single('image'),uploadImage);
router.get('/getImage',getAllImages);
router.delete('/delete/:id',deleteImage);

module.exports = router;
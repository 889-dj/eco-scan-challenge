const express = require('express');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { v2: cloudinary } = require('cloudinary');
const { uploadImage } = require('../controllers/scanCloudController.js');

const router = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer-Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'uploads', // Folder in Cloudinary where files will be uploaded
    allowed_formats: ['jpg', 'jpeg', 'png'], // Specify allowed file formats
  },
});
const upload = multer({ storage });

// Handle file upload
router.post('/', upload.single('file'), uploadImage);

module.exports = router;

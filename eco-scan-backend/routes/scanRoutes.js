const express = require('express');
const multer = require('multer');
const { uploadImage } = require('../controllers/scanController.js');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure the folder exists
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Handle file upload
router.post('/', upload.single('image'), uploadImage);

module.exports = router;

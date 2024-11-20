const express = require('express');
const multer = require('multer');
const { uploadImage } = require('../controllers/scanController.js');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Handle file upload
router.post('/', upload.single('image'), uploadImage);

// Error handling for multer
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Multer-specific error handling
    return res.status(400).send(`Multer Error: ${err.message}`);
  } else if (err) {
    // General error handling
    return res.status(500).send(`Error: ${err.message}`);
  }
  next();
});

module.exports = router;

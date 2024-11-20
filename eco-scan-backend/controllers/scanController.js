const Image = require('../models/Image');
const { analyzeImage } = require('../services/groqService');

const uploadImage = async (req, res) => {
  console.log(`req.body`, req.body);
  console.log(`req.file`, req.file);
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const imagePath = req.file.path; // Path to the uploaded image
    const carbonSaved = await analyzeImage(imagePath); // Call Groq API

    // Save image details to DB
    const image = await Image.create({
      userId: req.body.userId, // Assuming userId is sent in the request body
      imageUrl: imagePath,
      carbonSaved,
    });

    res.status(200).json({
      message: 'Image analyzed successfully',
      data: {
        imageId: image._id,
        carbonSaved: image.carbonSaved,
      },
    });
  } catch (error) {
    console.error('Error in uploadImage:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { uploadImage };

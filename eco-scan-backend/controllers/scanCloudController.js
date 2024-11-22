const Image = require('../models/Image');
const { analyzeImage } = require('../services/groqCloudService');

const uploadImage = async (req, res) => {
  try {
    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Cloudinary automatically provides the URL in req.file.path
    const imageUrl = req.file.path;

    console.log(imageUrl)

    // Analyze the image using Groq API
    const analysisResult = await analyzeImage(imageUrl);

    const { carbon_saved, reward_points } = JSON.parse(analysisResult); // Adjust according to Groq's response structure
    // Check if we have both values, throw an error if missing
    if (carbon_saved == null || reward_points == null) {
      return res.status(500).json({ message: 'Missing required data from Groq API response' });
    }

    // Extract carbon saved and reward points
    console.log("carbonSaved", carbon_saved, "rewardPoints", reward_points);

    // Save the image analysis details to the database
    const image = await Image.create({
      imageUrl,
      carbonSaved: carbon_saved,
      rewardPoints: reward_points,
    });

    // Return response
    res.status(200).json({
      message: 'Image analyzed successfully',
      data: {
        imageId: image._id,
        carbonSaved: image.carbonSaved,
        rewardPoints: image.rewardPoints,
      },
    });
  } catch (error) {
    console.error('Error in uploadImage:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { uploadImage };

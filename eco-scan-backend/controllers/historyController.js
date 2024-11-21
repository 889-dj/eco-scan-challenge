// controllers/historyController.js
const Image = require('../models/Image');

const getHistory = async (req, res) => {
  try {
    // Fetch all images from the database
    const images = await Image.find();

    if (images.length === 0) {
      return res.status(404).json({ message: 'No images found' });
    }

    // Return the images along with their carbonSaved and rewardPoints
    res.status(200).json({
      message: 'Images fetched successfully',
      data: images,
    });
  } catch (error) {
    console.error('Error in getHistory:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getHistory };

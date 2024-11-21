const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  carbonSaved: { type: Number, required: true },
  rewardPoints: { type: Number, required: true }, // Add rewardPoints if needed
  uploadedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Image', ImageSchema);

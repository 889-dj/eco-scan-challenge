const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  imageUrl: { type: String, required: true },
  carbonSaved: { type: Number, required: true },
  uploadedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Image', ImageSchema);

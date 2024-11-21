// controllers/offerController.js
const Image = require('../models/Image');

// Minimum points required to redeem an offer
const MIN_POINTS_TO_REDEEM = 100;

const getOfferDetails = async (req, res) => {
  try {
    // Fetch all images to calculate total reward points
    const images = await Image.find();

    if (images.length === 0) {
      return res.status(404).json({ message: 'No reward points found' });
    }

    // Calculate total reward points
    const totalRewardPoints = images.reduce((sum, image) => sum + image.rewardPoints, 0);

    // Determine if the user can redeem an offer
    const canRedeem = totalRewardPoints >= MIN_POINTS_TO_REDEEM;

    res.status(200).json({
      message: 'Reward points fetched successfully',
      totalRewardPoints,
      canRedeem,
      minPointsToRedeem: MIN_POINTS_TO_REDEEM,
    });
  } catch (error) {
    console.error('Error in getOfferDetails:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

const redeemOffer = async (req, res) => {
  try {
    // Fetch all images to calculate total reward points
    const images = await Image.find();

    if (images.length === 0) {
      return res.status(404).json({ message: 'No reward points found' });
    }

    // Calculate total reward points
    const totalRewardPoints = images.reduce((sum, image) => sum + image.rewardPoints, 0);

    if (totalRewardPoints < MIN_POINTS_TO_REDEEM) {
      return res.status(400).json({ message: 'Not enough reward points to redeem an offer' });
    }

    // Deduct the points needed for redemption
    let pointsToDeduct = MIN_POINTS_TO_REDEEM;
    for (let image of images) {
      if (image.rewardPoints <= pointsToDeduct) {
        pointsToDeduct -= image.rewardPoints;
        image.rewardPoints = 0;
      } else {
        image.rewardPoints -= pointsToDeduct;
        pointsToDeduct = 0;
      }
      await image.save(); // Save updated points
      if (pointsToDeduct === 0) break;
    }

    res.status(200).json({
      message: 'Offer redeemed successfully',
      remainingPoints: totalRewardPoints - MIN_POINTS_TO_REDEEM,
    });
  } catch (error) {
    console.error('Error in redeemOffer:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getOfferDetails, redeemOffer };

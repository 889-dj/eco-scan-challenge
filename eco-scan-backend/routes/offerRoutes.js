// routes/offerRoutes.js
const express = require('express');
const { getOfferDetails, redeemOffer } = require('../controllers/offerController');
const router = express.Router();

// Route to fetch total reward points and offers
router.get('/offers', getOfferDetails);

// Route to redeem an offer
router.post('/offers/redeem', redeemOffer);

module.exports = router;

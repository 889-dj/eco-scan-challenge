// routes/historyRoutes.js
const express = require('express');
const { getHistory } = require('../controllers/historyController');
const router = express.Router();

// Route to get all images with their carbon footprint and reward points
router.get('/history', getHistory);

module.exports = router;

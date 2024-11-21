const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./utils/db.js');
const scanRoutes = require('./routes/scanRoutes.js');
const historyRoutes = require('./routes/historyRoutes.js')
const offerRoutes = require('./routes/offerRoutes');  // Import offer routes
const path = require('path');

dotenv.config();

const app = express();

// Middleware
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/scan', scanRoutes);
app.use('/api/',historyRoutes);
app.use('/api', offerRoutes);

connectDB();
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

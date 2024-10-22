const express = require('express');
const connectDB = require('./config/db');
const diaryRoutes = require('./routes/diaryRoutes');
const cors = require('cors');
require('dotenv').config(); // For loading environment variables

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // For parsing JSON requests

// Routes
app.use('/api/diary', diaryRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

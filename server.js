const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const movieRoutes = require('./routes/movieroutes'); // ✅ correct path

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Mount the route (important)
app.use('/api', movieRoutes); // ✅ /api/save-video now works

// Root route
app.get('/', (req, res) => {
  res.send('🔥 Server and MongoDB are live');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

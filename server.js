const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/smiskiDB')
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch(err => console.error("🚨 MongoDB Connection Error:", err));

// Import and Use Routes
require('./routes/authRoutes')(app);
require('./routes/postRoutes')(app);
require('./routes/storyRoutes')(app);
require('./routes/staticRoutes')(app);
require('./routes/userRoutes')(app);

// Start Server
app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});

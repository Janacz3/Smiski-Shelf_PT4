const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const multer = require('multer');
const fs = require('fs');

// Import Models
const User = require('./models/userModel');
const Story = require('./models/storyModel');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/smiskiDB')
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("🚨 MongoDB Connection Error:", err));

// Ensure 'uploads' directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Multer Configuration for File Uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'pages')));
app.use(express.static(path.join(__dirname, 'public')));

// Serve Register Page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'register', 'register.html'));
});

// User Registration
app.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("🚨 Registration Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// User Login
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        res.status(200).json({ message: "Login successful" });

    } catch (error) {
        console.error("🚨 Login Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// Story Upload
app.post('/upload-story', upload.array('media', 5), async (req, res) => {
    try {
        console.log("🔄 Received request to upload story");
        console.log("📦 Request body:", req.body);
        console.log("📸 Uploaded files:", req.files);

        const { title, description } = req.body;
        if (!title.trim() || !description.trim()) {
            return res.status(400).json({ error: "Title and description are required" });
        }
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: "At least one file is required" });
        }

        const mediaFilenames = req.files.map(file => file.filename);
        const newStory = new Story({ title, description, media: mediaFilenames });
        await newStory.save();

        res.status(201).json({ message: "Story uploaded successfully", story: newStory });
    } catch (error) {
        console.error("🚨 Server error while uploading story:", error);
        res.status(500).json({ error: "Failed to upload story", details: error.message });
    }
});

// Serve Dashboard Page
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'dashboard', 'dashboard.html'));
});

// Start Server
app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});

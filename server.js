const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
require('dotenv').config();

// Import Models & Auth
const User = require('./models/userModel');
const Story = require('./models/storyModel');
const Post = require('./models/postModel'); // ✅ Import Post Model
const { registerUser, loginUser } = require('./auth/auth');
const authenticateToken = require('./middleware/authMiddleware');

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


// Handle story upload
app.post('/upload-story', upload.array('media', 5), async (req, res) => {
    try {
        console.log("🔄 Received request to upload story");
        console.log("📦 Request body:", req.body);
        console.log("📸 Uploaded files:", req.files);

        if (!req.body.title || !req.body.description || !req.files || req.files.length === 0) {
            console.error("❌ Missing required fields");
            return res.status(400).json({ error: "Missing required fields" });
        }

        const { title, description } = req.body;
        const mediaFilenames = req.files.map(file => file.filename);

        const newStory = new Story({ title, description, media: mediaFilenames });
        await newStory.save();

        console.log("✅ Story uploaded successfully:", newStory);
        res.status(201).json({ message: "Story uploaded successfully", story: newStory });
    } catch (error) {
        console.error("🚨 Server error while uploading story:", error);
        res.status(500).json({ error: "Failed to upload story", details: error.message });
    }
});

// ✅ New Route to Create a Post
app.post('/create-post', authenticateToken, upload.array('media', 5), async (req, res) => {
    console.log("🔐 Authenticated user:", req.user);
    if (!req.user) {
        return res.status(403).json({ error: "Unauthorized" });
    }

    const { text } = req.body;
    const username = req.user.username;
    const mediaFilenames = req.files ? req.files.map(file => file.filename) : [];

    if (!text && mediaFilenames.length === 0) {
        return res.status(400).json({ error: "Post must contain text or media." });
    }

    try {
        const newPost = new Post({ username, text, media: mediaFilenames });
        await newPost.save();

        console.log("✅ Post created successfully:", newPost);
        res.status(201).json({ message: "Post created successfully", post: newPost });
    } catch (error) {
        console.error("🚨 Error saving post:", error);
        res.status(500).json({ error: "Failed to create post" });
    }
});



// ✅ New Route to Get All Posts
app.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 }); // Fetch posts sorted by latest
        res.json(posts);
    } catch (error) {
        console.error("🚨 Error fetching posts:", error);
        res.status(500).json({ error: "Failed to fetch posts" });
    }
});

app.use("/pages", express.static(path.join(__dirname, "pages"), {
    setHeaders: (res, path) => {
        if (path.endsWith(".css")) {
            res.setHeader("Content-Type", "text/css");
        }
    }
}));

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'pages')));
app.use(express.static(path.join(__dirname, 'public')));

// Authentication Routes
app.post('/register', registerUser);
app.post('/login', loginUser);
app.post('/logout', authenticateToken, (req, res) => {
    console.log("Logout route accessed");
    res.json({ message: "You have been logged out successfully!" });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'register', 'register.html'));
});

// Serve login.html
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'login', 'login.html'));
});

// Protected Dashboard Route
app.get('/dashboard', authenticateToken, (req, res) => {
    res.json({ message: "Welcome to the dashboard!", user: req.user });
});

// Start Server
app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});

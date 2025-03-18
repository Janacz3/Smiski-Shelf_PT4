const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Enable CORS (Cross-Origin Resource Sharing)
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/smiskiDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB Connection Error:", err));

// Define a Mongoose schema
const storySchema = new mongoose.Schema({
    title: String,
    description: String,
    media: [String],  // Store filenames only
    createdAt: { type: Date, default: Date.now }
});

const Story = mongoose.model('Story', storySchema);

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');  // Store files in 'uploads/' directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);  // Unique filename
    }
});

const upload = multer({ storage });

// Serve static files (uploads)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve static files from 'pages' and 'public' folders
app.use(express.static(path.join(__dirname, 'pages')));
app.use(express.static(path.join(__dirname, 'public')));

// Serve dashboard.html as the default page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'dashboard', 'dashboard.html'));
});

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


// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

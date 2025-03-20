const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
require('dotenv').config();


// Import Models & Auth
const User = require('./models/userModel');
const Story = require('./models/storyModel');
const Post = require('./models/postModel'); // ✅ Import Post Model
const { registerUser, loginUser } = require('./auth/auth');
const authenticateToken = require('./middleware/authMiddleware');

const app = express();
const port = 3000;

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
    service: "gmail", // Use your email provider (e.g., Outlook, SMTP)
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

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

// Reset Password Route
app.post("/reset-password", async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        console.log("Reset request for email:", email); // Debugging

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Generate a secure token
        const token = crypto.randomBytes(32).toString("hex");

        // Store the token and expiry time in the database
        user.resetToken = token;
        user.resetTokenExpiry = Date.now() + 3600000; // Token valid for 1 hour
        await user.save();

        // Send email with reset link
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Password Reset",
            html: `<p>Click <a href="http://localhost:3000/new-password/new-pass.html?token=${token}">here</a> to reset your password.</p>`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error sending email:", error);
                return res.status(500).json({ message: "Error sending email" });
            }
            console.log("Email sent:", info.response);
            res.json({ message: "Reset link sent successfully" });
        });

    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


// Handle password update
app.post("/reset-password/new", async (req, res) => {
    const { token, newPassword } = req.body;
    const user = await User.findOne({ resetToken: token, resetTokenExpiry: { $gt: Date.now() } });

    if (!user) return res.status(400).json({ message: "Invalid or expired token." });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = await bcrypt.hash(newPassword, 10); // ✅ Hash the new password
    user.resetToken = undefined; // Remove the reset token
    user.resetTokenExpiry = undefined; // Remove expiry
    await user.save();


    res.json({ message: "Password updated successfully." });
});

app.post("/api/reset-password", async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        
        // Verify token
        const user = await User.findOne({ resetToken: token, resetTokenExpiry: { $gt: Date.now() } });
        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        // Hash the new password before saving
        user.password = await bcrypt.hash(newPassword, 10);
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;
        await user.save();

        res.json({ message: "Password reset successful!" });

    } catch (error) {
        console.error("Error resetting password:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});




// Start Server
app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});



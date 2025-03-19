const mongoose = require("mongoose");

// Define Post Schema
const postSchema = new mongoose.Schema({
    username: String,
    text: String,
    createdAt: { type: Date, default: Date.now }
});

// Create Post Model
const Post = mongoose.model("Post", postSchema);

module.exports = Post;

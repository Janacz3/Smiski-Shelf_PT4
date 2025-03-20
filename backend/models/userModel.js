const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    resetToken: { type: String, default: null }, // Store reset token
    resetTokenExpiry: { type: Date, default: null } // Token expiration time
});

module.exports = mongoose.model("User", userSchema);

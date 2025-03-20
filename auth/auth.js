const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
require('dotenv').config();

const speakeasy = require('speakeasy');
const { sendVerificationCode } = require('../utils/emailService');

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ message: "Username, email, and password are required" });
        }

        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: "Email or username already in use" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


const loginUser = async (req, res) => {
    try {
        const { email, password, verificationCode } = req.body;
        
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

        // Verification code handling
        if (!verificationCode) {
            try {
                const secret = speakeasy.generateSecret().base32;
                const code = speakeasy.totp({
                    secret: secret,
                    encoding: 'base32'
                });

                user.twoFactorSecret = secret;
                user.tokenExpiry = new Date(Date.now() + 10 * 60 * 1000);
                await user.save();

                await sendVerificationCode(user.email, code);

                return res.status(200).json({ 
                    message: "Verification code sent to email",
                    requireVerification: true
                });
            } catch (emailError) {
                console.error('Email error:', emailError);
                return res.status(500).json({ 
                    message: "Error sending verification code",
                    error: emailError.message 
                });
            }
        }

        // Verify the code
        const verified = speakeasy.totp.verify({
            secret: user.twoFactorSecret,
            encoding: 'base32',
            token: verificationCode,
            window: 2
        });

        if (!verified || Date.now() > user.tokenExpiry) {
            return res.status(401).json({ message: "Invalid or expired verification code" });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Clear 2FA data after successful verification
        user.twoFactorSecret = undefined;
        user.tokenExpiry = undefined;
        await user.save();

        res.status(200).json({
            message: "Login successful",
            token,
            username: user.username
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ 
            message: "Server error", 
            error: error.message 
        });
    }
};

module.exports = { registerUser, loginUser };

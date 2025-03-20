const nodemailer = require('nodemailer');
require('dotenv').config();

// Add verification of environment variables
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    throw new Error('Email credentials are not properly configured in .env file');
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    },
    debug: true // Enable debug logs
});

// Verify transporter configuration
transporter.verify(function(error, success) {
    if (error) {
        console.error('SMTP connection error:', error);
    } else {
        console.log('Server is ready to send emails');
    }
});

const sendVerificationCode = async (email, code) => {
    try {
        console.log('Attempting to send email to:', email);
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Your Login Verification Code',
            text: `Your verification code is: ${code}`
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.response);
        return info;
    } catch (error) {
        console.error('Detailed email error:', {
            errorName: error.name,
            errorMessage: error.message,
            errorStack: error.stack
        });
        throw new Error(`Failed to send verification code: ${error.message}`);
    }
};

module.exports = { sendVerificationCode };
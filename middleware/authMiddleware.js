const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(403).json({ message: "Access denied. No token provided or wrong format." });
    }

    const token = authHeader.split(" ")[1]; // Extract token part

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(401).json({ message: "Invalid or expired token" });
        }
        req.user = user;
        next();
    });
};

module.exports = authenticateToken;


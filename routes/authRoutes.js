const { registerUser, loginUser } = require('../auth/auth');
const authenticateToken = require('../middleware/authMiddleware');

module.exports = (app) => {
    app.post('/register', registerUser);
    app.post('/login', loginUser);
    app.post('/logout', authenticateToken, (req, res) => {
        console.log("Logout route accessed");
        res.json({ message: "You have been logged out successfully!" });
    });
};

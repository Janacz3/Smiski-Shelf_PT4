const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Set headers to enable cross-origin isolation
app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    next();
});

// Serve static files from the root project directory
app.use(express.static(path.join(__dirname, 'pages')));
app.use(express.static(path.join(__dirname, 'public'))); // If you have a 'public' folder for assets

// Serve dashboard.html as the default page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'dashboard', 'dashboard.html'));
});
// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

const express = require('express');
const path = require('path');

module.exports = (app) => {
    // ✅ Serve Static Files
    app.use("/pages", express.static(path.join(__dirname, "../pages"), {
        setHeaders: (res, path) => {
            if (path.endsWith(".css")) {
                res.setHeader("Content-Type", "text/css");
            }
        }
    }));

    app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
    app.use(express.static(path.join(__dirname, '../pages')));
    app.use(express.static(path.join(__dirname, '../public')));

    // ✅ Serve register page
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '../pages', 'register', 'register.html'));
    });

    // ✅ Serve login page
    app.get('/login', (req, res) => {
        res.sendFile(path.join(__dirname, '../pages', 'login', 'login.html'));
    });
};

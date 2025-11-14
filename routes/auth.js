const express = require('express');
const router = express.Router();
const { adminLogin } = require('../controllers/authControllers');

// Auth routes

// POST /auth/login - Admin login
router.post('/login', adminLogin);

// POST /auth/register - Admin registration
router.post('/register', (req, res) => {
    // Registration logic will be implemented later
    res.status(501).json({ message: 'Register endpoint not implemented yet' });
});

// POST /auth/logout - Admin logout
router.post('/logout', (req, res) => {
    // Logout logic will be implemented later
    res.status(501).json({ message: 'Logout endpoint not implemented yet' });
});

// GET /auth/profile - Get admin profile
router.get('/profile', (req, res) => {
    // Profile logic will be implemented later
    res.status(501).json({ message: 'Profile endpoint not implemented yet' });
});

module.exports = router;

// src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Login route
router.post('/login', authController.login);
router.get('/current-user', authController.getCurrentUser);
// Add other routes (e.g., registration) as needed

module.exports = router;

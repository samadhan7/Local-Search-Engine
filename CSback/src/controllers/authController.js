// src/controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const dotenv = require('dotenv');
dotenv.config();
async function login(req, res) {
  const { username, password } = req.body;

  try {
    const user = await User.findByUsername(username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, { expiresIn: '24h' });

    res.json({ token });
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
}


async function getCurrentUser(req, res) {
  try {
    // Get the JWT token from the request headers
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];

    // Verify the token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
// console.log("decoded",decoded);
    // Fetch user details from the database based on the username
    const currentUser = await User.findById(decoded.userId); // Await the promise

    if (!currentUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return relevant user information
    const userObject = {
      username: currentUser.username,
      role: currentUser.role,
      city: currentUser.city,
      name: currentUser.name,
      address: currentUser.address,
      status: currentUser.status
    };

    res.json({ user: userObject });
  } catch (error) {
    console.error('Error fetching current user:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
}


module.exports = { login, getCurrentUser};

const User = require('../models/User');

async function register(req, res) {
  const { username, password , name, address, contact, city } = req.body;

  try {
    // Check if username already exists
    const existingUser = await User.findByUsername(username);
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Create new user
    await User.createUser(username, password, name, address, contact, city);
    
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  register,
};

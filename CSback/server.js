// server.js

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoutes = require('./src/routes/userRoutes');
const authRoutes = require('./src/routes/authRoutes');
const { connection } = require('./database');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies



// Routes
// Define your routes here
app.use('/api/users', userRoutes);
app.use('/auth', authRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Handle database connection errors

connection.connect((err) => {
    if (err) {
        console.log(err.message);
    }
    console.log('Connected to database.');
    
});
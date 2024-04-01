const { connection } = require('../../database');
const bcrypt = require('bcrypt');

class User {
  async findByUsername(username) {
    try {
      const [users] = await connection.promise().query('SELECT * FROM users WHERE username = ?', [username]);
      return users[0];
    } catch (error) {
      console.error('Error fetching user:', error.message);
      throw error;
    }
  }

  async findById(userId) {
    try {
      const [users] = await connection.promise().query('SELECT * FROM users WHERE id = ?', [userId]);
      return users[0];
    } catch (error) {
      console.error('Error fetching user:', error.message);
      throw error;
    }
  }

  async createUser(username, password, name, address, contact, city) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      await connection.promise().query('INSERT INTO users (username, password, name, address, city) VALUES (?, ?, ?, ?, ?)', [username, hashedPassword, name, address, contact, city]);
    } catch (error) {
      console.error('Error creating user:', error.message);
      throw error;
    }
  }
}

module.exports = new User();

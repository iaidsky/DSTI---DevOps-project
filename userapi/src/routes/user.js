const express = require('express');
const router = express.Router();
const db = require('../dbClient');

// Get all users
router.get('/', async (req, res) => {
  try {
    const keys = await db.keys('user:*');
    const users = [];
    
    for (const key of keys) {
      const username = key.replace('user:', '');
      const userData = await db.hGetAll(key);
      users.push({ username, ...userData });
    }
    
    res.json({ users, count: users.length });
  } catch (err) {
    console.error('Error getting users:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create user
router.post('/', async (req, res) => {
  try {
    const { username, firstname, lastname, email } = req.body;

    if (!username || !firstname || !lastname || !email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if user already exists
    const exists = await db.exists(`user:${username}`);
    if (exists) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // Store user data
    await db.hSet(`user:${username}`, 'firstname', firstname);
    await db.hSet(`user:${username}`, 'lastname', lastname);
    await db.hSet(`user:${username}`, 'email', email);
    res.status(201).json({ message: 'User created successfully', username });
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user
router.get('/:username', async (req, res) => {
  try {
    const { username } = req.params;
    
    const exists = await db.exists(`user:${username}`);
    if (!exists) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userData = await db.hGetAll(`user:${username}`);
    res.json({ username, ...userData });
  } catch (err) {
    console.error('Error getting user:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update user
router.put('/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const { firstname, lastname, email } = req.body;

    const exists = await db.exists(`user:${username}`);
    if (!exists) {
      return res.status(404).json({ error: 'User not found' });
    }

    const updates = {};
    if (firstname) updates.firstname = firstname;
    if (lastname) updates.lastname = lastname;
    if (email) updates.email = email;

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    for (const [field, value] of Object.entries(updates)) {
      await db.hSet(`user:${username}`, field, value);
    }
    res.json({ message: 'User updated successfully', username });
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete user
router.delete('/:username', async (req, res) => {
  try {
    const { username } = req.params;

    const exists = await db.exists(`user:${username}`);
    if (!exists) {
      return res.status(404).json({ error: 'User not found' });
    }

    await db.del(`user:${username}`);
    res.json({ message: 'User deleted successfully', username });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET all users
router.get('/', (req, res) => {
  db.query('SELECT id, name, email, role, created_at FROM users', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// POST new user (register)
router.post('/', (req, res) => {
  const { name, email, password, role } = req.body;
  const sql = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, email, password, role || 'tourist'], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: result.insertId, message: 'User registered successfully' });
  });
});
// PUT - update user
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, role } = req.body;
  const sql = 'UPDATE users SET name=?, email=?, role=? WHERE id=?';
  db.query(sql, [name, email, role, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'User updated successfully' });
  });
});

// DELETE user
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM users WHERE id=?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'User deleted successfully' });
  });
});
module.exports = router;
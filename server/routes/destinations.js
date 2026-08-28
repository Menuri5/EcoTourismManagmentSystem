const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET all destinations
router.get('/', (req, res) => {
  db.query('SELECT * FROM destinations', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// POST new destination
router.post('/', (req, res) => {
  const { name, location, description, category, image_url } = req.body;
  const sql = 'INSERT INTO destinations (name, location, description, category, image_url) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [name, location, description, category, image_url], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: result.insertId, message: 'Destination added successfully' });
  });
});

module.exports = router;
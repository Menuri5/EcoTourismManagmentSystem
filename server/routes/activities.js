const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET all activities (destination name ekath ganna)
router.get('/', (req, res) => {
  const sql = `
    SELECT activities.id, activities.activity_name, activities.description,
           destinations.name AS destination_name
    FROM activities
    JOIN destinations ON activities.destination_id = destinations.id`;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// POST new activity
router.post('/', (req, res) => {
  const { destination_id, activity_name, description } = req.body;
  const sql = 'INSERT INTO activities (destination_id, activity_name, description) VALUES (?, ?, ?)';
  db.query(sql, [destination_id, activity_name, description], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: result.insertId, message: 'Activity added successfully' });
  });
});

module.exports = router;
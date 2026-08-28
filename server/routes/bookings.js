const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET all bookings (join karala user saha destination name ekath ganna)
router.get('/', (req, res) => {
  const sql = `
    SELECT bookings.id, users.name AS tourist_name, destinations.name AS destination_name,
           bookings.booking_date, bookings.number_of_people, bookings.status
    FROM bookings
    JOIN users ON bookings.user_id = users.id
    JOIN destinations ON bookings.destination_id = destinations.id`;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// POST new booking
router.post('/', (req, res) => {
  const { user_id, destination_id, booking_date, number_of_people } = req.body;
  const sql = 'INSERT INTO bookings (user_id, destination_id, booking_date, number_of_people) VALUES (?, ?, ?, ?)';
  db.query(sql, [user_id, destination_id, booking_date, number_of_people], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: result.insertId, message: 'Booking created successfully' });
  });
});

module.exports = router;
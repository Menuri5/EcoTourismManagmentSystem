const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET all donations (donor name ekath ganna)
router.get('/', (req, res) => {
  const sql = `
    SELECT donations.id, users.name AS donor_name, donations.amount,
           donations.purpose, donations.donated_at
    FROM donations
    JOIN users ON donations.user_id = users.id`;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// POST new donation
router.post('/', (req, res) => {
  const { user_id, amount, purpose } = req.body;
  const sql = 'INSERT INTO donations (user_id, amount, purpose) VALUES (?, ?, ?)';
  db.query(sql, [user_id, amount, purpose], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: result.insertId, message: 'Donation recorded successfully' });
  });
});
// PUT - update donation
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { amount, purpose } = req.body;
  const sql = 'UPDATE donations SET amount=?, purpose=? WHERE id=?';
  db.query(sql, [amount, purpose, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Donation updated successfully' });
  });
});

// DELETE donation
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM donations WHERE id=?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Donation deleted successfully' });
  });
});
module.exports = router;
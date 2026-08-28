// PUT - update destination
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, location, description, category, image_url } = req.body;
  const sql = 'UPDATE destinations SET name=?, location=?, description=?, category=?, image_url=? WHERE id=?';
  db.query(sql, [name, location, description, category, image_url, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Destination updated successfully' });
  });
});

// DELETE destination
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM destinations WHERE id=?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Destination deleted successfully' });
  });
});
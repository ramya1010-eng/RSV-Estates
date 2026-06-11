const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const multer = require('multer');
const path = require('path');

// Multer config — save to /uploads folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// GET all testimonials
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM testimonials ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch testimonials' });
  }
});

// POST add testimonial
router.post('/', upload.single('image'), async (req, res) => {
  const { name, role, review } = req.body;
  const image_url = req.file ? `/uploads/${req.file.filename}` : null;
  try {
    const result = await pool.query(
      'INSERT INTO testimonials (name, role, review, image_url) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, role, review, image_url]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add testimonial' });
  }
});

// PUT update testimonial
router.put('/:id', upload.single('image'), async (req, res) => {
  const { name, role, review } = req.body;
  const { id } = req.params;
  try {
    // If new image uploaded, use it; else keep existing
    let image_url = null;
    if (req.file) {
      image_url = `/uploads/${req.file.filename}`;
      await pool.query(
        'UPDATE testimonials SET name=$1, role=$2, review=$3, image_url=$4 WHERE id=$5 RETURNING *',
        [name, role, review, image_url, id]
      );
    } else {
      await pool.query(
        'UPDATE testimonials SET name=$1, role=$2, review=$3 WHERE id=$4 RETURNING *',
        [name, role, review, id]
      );
    }
    const updated = await pool.query('SELECT * FROM testimonials WHERE id=$1', [id]);
    res.json(updated.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update testimonial' });
  }
});

// DELETE testimonial
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM testimonials WHERE id=$1', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete testimonial' });
  }
});

module.exports = router;
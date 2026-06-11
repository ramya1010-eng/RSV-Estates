const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET all reviews
router.get('/', async (req, res) => {
  try {
    const result = await db.query(
      'SELECT * FROM customer_reviews ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching reviews:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch reviews.' });
  }
});

// POST new review
router.post('/', async (req, res) => {
  try {
    const { name, role, review, rating } = req.body;

    if (!name || !review) {
      return res.status(400).json({ success: false, message: 'Name and review are required.' });
    }

    await db.query(
      'INSERT INTO customer_reviews (name, role, review, rating) VALUES ($1, $2, $3, $4)',
      [name, role || '', review, rating || 5]
    );

    res.json({ success: true, message: 'Review submitted successfully.' });
  } catch (err) {
    console.error('Error saving review:', err);
    res.status(500).json({ success: false, message: 'Failed to submit review.' });
  }
});

module.exports = router;

// const express = require('express');
// const router = express.Router();
// const db = require('../config/db');

// // GET all reviews
// router.get('/', async (req, res) => {
//   try {
//     const result = await db.query(
//       'SELECT * FROM customer_reviews ORDER BY created_at DESC'
//     );
//     res.json(result.rows);
//   } catch (err) {
//     console.error('Error fetching reviews:', err);
//     res.status(500).json({ success: false, message: 'Failed to fetch reviews.' });
//   }
// });

// // POST new review
// router.post('/', async (req, res) => {
//   try {
//     const { name, role, review, rating } = req.body;

//     if (!name || !review) {
//       return res.status(400).json({ success: false, message: 'Name and review are required.' });
//     }

//     await db.query(
//       'INSERT INTO customer_reviews (name, role, review, rating) VALUES ($1, $2, $3, $4)',
//       [name, role || '', review, rating || 5]
//     );

//     res.json({ success: true, message: 'Review submitted successfully.' });
//   } catch (err) {
//     console.error('Error saving review:', err);
//     res.status(500).json({ success: false, message: 'Failed to submit review.' });
//   }
// });

// module.exports = router;








// routes/CustomerReviewRoute.js

const express = require('express');
const router  = express.Router();
const db      = require('../config/db'); // your pg pool

// ── GET all (optional ?status=approved filter) ────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const { status } = req.query;
    let query  = 'SELECT * FROM customer_reviews';
    let params = [];
    if (status) {
      query  += ' WHERE status = $1';
      params  = [status];
    }
    query += ' ORDER BY created_at DESC';
    const result = await db.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error('GET customer-reviews error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ── POST create new review (public submit) ────────────────────────────────────
router.post('/', async (req, res) => {
  try {
    const { name, role, review, rating, status = 'pending' } = req.body;
    if (!name || !review) {
      return res.status(400).json({ success: false, message: 'Name and review are required.' });
    }
    const result = await db.query(
      `INSERT INTO customer_reviews (name, role, review, rating, status, created_at)
       VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING *`,
      [name, role || '', review, rating || 5, status]
    );
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.error('POST customer-reviews error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ── PATCH update status — approve / reject / pending ─────────────────────────
router.patch('/:id/status', async (req, res) => {
  try {
    const { id }     = req.params;
    const { status } = req.body;
    const allowed    = ['approved', 'rejected', 'pending'];
    if (!allowed.includes(status)) {
      return res.status(400).json({ error: `status must be one of: ${allowed.join(', ')}` });
    }
    const result = await db.query(
      `UPDATE customer_reviews SET status = $1 WHERE id = $2 RETURNING *`,
      [status, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Review not found' });
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.error('PATCH customer-reviews status error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ── PUT update review content (admin edit) ────────────────────────────────────
router.put('/:id', async (req, res) => {
  try {
    const { id }                        = req.params;
    const { name, role, review, rating } = req.body;
    if (!name || !review) {
      return res.status(400).json({ success: false, message: 'Name and review are required.' });
    }
    const result = await db.query(
      `UPDATE customer_reviews
       SET name = $1, role = $2, review = $3, rating = $4
       WHERE id = $5 RETURNING *`,
      [name, role || '', review, rating || 5, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Review not found' });
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.error('PUT customer-reviews error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ── DELETE review ─────────────────────────────────────────────────────────────
router.delete('/:id', async (req, res) => {
  try {
    const result = await db.query(
      'DELETE FROM customer_reviews WHERE id = $1 RETURNING id',
      [req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Review not found' });
    res.json({ success: true, deletedId: result.rows[0].id });
  } catch (err) {
    console.error('DELETE customer-reviews error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// GET all approved listings for Buy page
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM sell_listings WHERE status = 'approved' ORDER BY created_at DESC`
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('BUY GET ERROR:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const pool = require('../config/db');

router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM sold_leased ORDER BY created_at DESC`);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { property_title, location, price, size, property_type, represented, customer_name, status } = req.body;
    const result = await pool.query(
      `INSERT INTO sold_leased (property_title, location, price, size, property_type, represented, customer_name, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [property_title, location, price, size, property_type, represented, customer_name, status]
    );
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await pool.query(`DELETE FROM sold_leased WHERE id = $1`, [req.params.id]);
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
const express = require('express');
const router = require('express').Router();
const pool = require('../config/db');
const multer = require('multer');
const path = require('path');

// ── Multer Storage ────────────────────────────────────────────────────────────
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname.replace(/\s/g, '_'))
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB per file
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    if (ext) cb(null, true);
    else cb(new Error('Only images allowed'));
  }
});

/*
====================================
CREATE SELL LISTING
POST /api/sell
====================================
*/
router.post('/', upload.array('images', 10), async (req, res) => {
  try {
    const {
      property_name, category, property_type,
      location, price, description, amenities,
      property_address, member_type,
    } = req.body;

    if (!property_name || !location) {
      return res.status(400).json({
        success: false,
        message: 'Property name and location are required',
      });
    }

    // Save image paths
    const imagePaths = req.files && req.files.length > 0
      ? req.files.map(f => `/uploads/${f.filename}`).join(',')
      : null;

    const result = await pool.query(
      `INSERT INTO sell_listings 
        (property_name, category, property_type, location, price, description, amenities, property_address, member_type, status, image_urls)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 'pending', $10)
       RETURNING *`,
      [property_name, category, property_type, location, price, description, amenities, property_address, member_type, imagePaths]
    );

    res.status(201).json({
      success: true,
      message: 'Property submitted successfully',
      data: result.rows[0],
    });

  } catch (err) {
    console.error('SELL POST ERROR:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

/*
====================================
GET ALL SELL LISTINGS
GET /api/sell
====================================
*/
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM sell_listings ORDER BY created_at DESC`
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('SELL GET ERROR:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

/*
====================================
UPDATE SELL LISTING STATUS
PATCH /api/sell/:id
====================================
*/
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const result = await pool.query(
      `UPDATE sell_listings SET status = $1 WHERE id = $2 RETURNING *`,
      [status, id]
    );

    if (result.rowCount === 0) return res.status(404).json({ success: false, message: 'Listing not found' });

    res.status(200).json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.error('SELL PATCH ERROR:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

/*
====================================
UPDATE SELL LISTING
PUT /api/sell/:id
====================================
*/
router.put('/:id', upload.array('images', 10), async (req, res) => {
  try {
    const { id } = req.params;
    const { property_name, category, property_type, location, price, description, amenities, property_address, member_type, status } = req.body;

    // If new images uploaded, update them
    let imageUpdate = '';
    let params = [property_name, category, property_type, location, price, description, amenities, property_address, member_type, status];

    if (req.files && req.files.length > 0) {
      const imagePaths = req.files.map(f => `/uploads/${f.filename}`).join(',');
      imageUpdate = `, image_urls=$11`;
      params.push(imagePaths);
      params.push(id);
    } else {
      params.push(id);
    }

    const result = await pool.query(
      `UPDATE sell_listings SET 
        property_name=$1, category=$2, property_type=$3, location=$4, 
        price=$5, description=$6, amenities=$7, property_address=$8, 
        member_type=$9, status=$10${imageUpdate}
       WHERE id=$${params.length} RETURNING *`,
      params
    );

    if (result.rowCount === 0) return res.status(404).json({ success: false, message: 'Not found' });

    res.status(200).json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.error('SELL PUT ERROR:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

/*
====================================
DELETE SELL LISTING
DELETE /api/sell/:id
====================================
*/
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `DELETE FROM sell_listings WHERE id = $1 RETURNING *`,
      [id]
    );
    if (result.rowCount === 0) return res.status(404).json({ success: false, message: 'Listing not found' });
    res.status(200).json({ success: true, message: 'Deleted successfully', deleted: result.rows[0] });
  } catch (err) {
    console.error('SELL DELETE ERROR:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
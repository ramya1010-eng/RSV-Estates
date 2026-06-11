const express = require("express");
const router = express.Router();
const { Pool } = require("pg");
require("dotenv").config({ path: require("path").resolve(__dirname, "../.env") });

// Direct pool - no db.js dependency
const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || "RVS",
  port: parseInt(process.env.DB_PORT) || 5432,
});

// GET all sold/leased deals (newest first)
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM sold ORDER BY created_at DESC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error("GET /sold-leased error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// POST - add new deal
router.post("/", async (req, res) => {
  const {
    property_title,
    location,
    price,
    size,
    property_type,
    represented,
    status,
    customer_name,
  } = req.body;

  if (!property_title || !location) {
    return res
      .status(400)
      .json({ error: "property_title and location are required" });
  }

  try {
    const result = await pool.query(
      `INSERT INTO sold
        (property_title, location, price, size, property_type, represented, status, customer_name)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [
        property_title,
        location,
        price || null,
        size || null,
        property_type || "Land",
        represented || "Both Buyer & Sellers",
        status || "Sold Out",
        customer_name || null,
      ]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("POST /sold-leased error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// PUT - update existing deal
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const {
    property_title,
    location,
    price,
    size,
    property_type,
    represented,
    status,
    customer_name,
  } = req.body;

  try {
    const result = await pool.query(
      `UPDATE sold SET
        property_title = $1,
        location       = $2,
        price          = $3,
        size           = $4,
        property_type  = $5,
        represented    = $6,
        status         = $7,
        customer_name  = $8
       WHERE id = $9
       RETURNING *`,
      [
        property_title,
        location,
        price || null,
        size || null,
        property_type,
        represented,
        status,
        customer_name || null,
        id,
      ]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Deal not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error("PUT /sold-leased/:id error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE - remove a deal
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM sold WHERE id = $1 RETURNING id",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Deal not found" });
    }
    res.json({ success: true, deleted_id: id });
  } catch (err) {
    console.error("DELETE /sold-leased/:id error:", err);
    res.status(500).json({ error: "Server error" });
  }
});     

module.exports = router;

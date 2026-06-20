const express = require("express");
const router = express.Router();
const { Pool } = require("pg");
require("dotenv").config({ path: require("path").resolve(__dirname, "../.env") });

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || "RVS",
  port: parseInt(process.env.DB_PORT) || 5432,
});

// GET all
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM sold_leased ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (err) {
    console.error("GET /sold-leased error:", err);
    res.status(500).json({ error: "Server error" });
  }
});


// POST - add new
router.post("/", async (req, res) => {
  const { area, locality, price, size, type, represented, status, description } = req.body;

  if (!area || !locality) {
    return res.status(400).json({ error: "area and locality are required" });
  }

  try {
    const result = await pool.query(
      `INSERT INTO sold_leased (area, locality, price, size, type, represented, status, description, category)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [
        area,
        locality,
        price || null,
        size || null,
        type || "Land",
        represented || "Both Buyer & Sellers",
        status || "Sold",
        description || null,
        "residential",
      ]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("POST /sold-leased error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// PUT - update
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { area, locality, price, size, type, represented, status, description } = req.body;

  try {
    const result = await pool.query(
      `UPDATE sold_leased SET
        area        = $1,
        locality    = $2,
        price       = $3,
        size        = $4,
        type        = $5,
        represented = $6,
        status      = $7,
        description = $8
       WHERE id = $9
       RETURNING *`,
      [area, locality, price || null, size || null, type, represented, status, description || null, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: "Deal not found" });
    res.json(result.rows[0]);
  } catch (err) {
    console.error("PUT /sold-leased/:id error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM sold_leased WHERE id = $1 RETURNING id", [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: "Deal not found" });
    res.json({ success: true, deleted_id: id });
  } catch (err) {
    console.error("DELETE /sold-leased/:id error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
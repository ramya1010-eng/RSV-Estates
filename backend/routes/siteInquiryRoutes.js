const express = require("express");
const router = express.Router();
const pool = require("../config/db");

/*
====================================
CREATE SITE INQUIRY
POST /api/site-inquiries
====================================
*/
router.post("/", async (req, res) => {
  try {
    const { name, phone, region } = req.body;

    if (!name || !phone || !region) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const result = await pool.query(
      `
      INSERT INTO site_inquiries
      (name, phone, region)
      VALUES ($1, $2, $3)
      RETURNING *
      `,
      [name, phone, region]
    );

    res.status(201).json({
      success: true,
      message: "Inquiry saved successfully",
      data: result.rows[0],
    });

  } catch (err) {
    console.error("POST ERROR:", err);

    res.status(500).json({
      success: false,
      message: "Failed to save inquiry",
      error: err.message,
    });
  }
});

/*
====================================
GET ALL SITE INQUIRIES
GET /api/site-inquiries
====================================
*/
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT *
      FROM site_inquiries
      ORDER BY created_at DESC
    `);

    res.status(200).json(result.rows);

  } catch (err) {
    console.error("GET ERROR:", err);

    res.status(500).json({
      success: false,
      message: "Failed to fetch inquiries",
      error: err.message,
    });
  }
});

/*
====================================
DELETE SITE INQUIRY
DELETE /api/site-inquiries/:id
====================================
*/
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    console.log("Deleting inquiry:", id);

    const result = await pool.query(
      `
      DELETE FROM site_inquiries
      WHERE id = $1
      RETURNING *
      `,
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Inquiry not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Inquiry deleted successfully",
      deleted: result.rows[0],
    });

  } catch (err) {
    console.error("DELETE ERROR:", err);

    res.status(500).json({
      success: false,
      message: "Failed to delete inquiry",
      error: err.message,
    });
  }
});

module.exports = router;
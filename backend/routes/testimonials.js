const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const upload = require("../config/upload");

// GET ALL
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM testimonials ORDER BY id DESC"
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// ADD
router.post(
  "/",
  upload.single("image"),
  async (req, res) => {
    try {
      const { name, role, review } = req.body;

      const image_url = req.file
        ? `/uploads/${req.file.filename}`
        : null;

      const result = await pool.query(
        `
        INSERT INTO testimonials
        (name, role, review, image_url)
        VALUES ($1,$2,$3,$4)
        RETURNING *
        `,
        [
          name,
          role,
          review,
          image_url,
        ]
      );

      res.json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  }
);

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    await pool.query(
      "DELETE FROM testimonials WHERE id=$1",
      [req.params.id]
    );

    res.json({
      message: "Deleted"
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
// // const express = require("express");
// // const router = express.Router();
// // const pool = require("../config/db");

// // /*
// // ====================================
// // CREATE SITE INQUIRY
// // POST /api/site-inquiries
// // ====================================
// // */
// // router.post("/", async (req, res) => {
// //   try {
// //     const { name, phone, region } = req.body;

// //     if (!name || !phone || !region) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "All fields are required",
// //       });
// //     }

// //     const result = await pool.query(
// //       `
// //       INSERT INTO site_inquiries
// //       (name, phone, region)
// //       VALUES ($1, $2, $3)
// //       RETURNING *
// //       `,
// //       [name, phone, region]
// //     );

// //     res.status(201).json({
// //       success: true,
// //       message: "Inquiry saved successfully",
// //       data: result.rows[0],
// //     });

// //   } catch (err) {
// //     console.error("POST ERROR:", err);

// //     res.status(500).json({
// //       success: false,
// //       message: "Failed to save inquiry",
// //       error: err.message,
// //     });
// //   }
// // });

// // /*
// // ====================================
// // GET ALL SITE INQUIRIES
// // GET /api/site-inquiries
// // ====================================
// // */
// // router.get("/", async (req, res) => {
// //   try {
// //     const result = await pool.query(`
// //       SELECT *
// //       FROM site_inquiries
// //       ORDER BY created_at DESC
// //     `);

// //     res.status(200).json(result.rows);

// //   } catch (err) {
// //     console.error("GET ERROR:", err);

// //     res.status(500).json({
// //       success: false,
// //       message: "Failed to fetch inquiries",
// //       error: err.message,
// //     });
// //   }
// // });

// // /*
// // ====================================
// // DELETE SITE INQUIRY
// // DELETE /api/site-inquiries/:id
// // ====================================
// // */
// // router.delete("/:id", async (req, res) => {
// //   try {
// //     const { id } = req.params;

// //     console.log("Deleting inquiry:", id);

// //     const result = await pool.query(
// //       `
// //       DELETE FROM site_inquiries
// //       WHERE id = $1
// //       RETURNING *
// //       `,
// //       [id]
// //     );

// //     if (result.rowCount === 0) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "Inquiry not found",
// //       });
// //     }

// //     res.status(200).json({
// //       success: true,
// //       message: "Inquiry deleted successfully",
// //       deleted: result.rows[0],
// //     });

// //   } catch (err) {
// //     console.error("DELETE ERROR:", err);

// //     res.status(500).json({
// //       success: false,
// //       message: "Failed to delete inquiry",
// //       error: err.message,
// //     });
// //   }
// // });

// // module.exports = router;



// const express = require("express");
// const router = express.Router();
// const pool = require("../config/db");
// const nodemailer = require("nodemailer");

// // Nodemailer transporter
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// /*
// ====================================
// CREATE SITE INQUIRY
// POST /api/site-inquiries
// ====================================
// */
// router.post("/", async (req, res) => {
//   try {
//     const { name, phone, region } = req.body;

//     if (!name || !phone || !region) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields are required",
//       });
//     }

//     // 1. Save to DB
//     const result = await pool.query(
//       `
//       INSERT INTO site_inquiries
//       (name, phone, region)
//       VALUES ($1, $2, $3)
//       RETURNING *
//       `,
//       [name, phone, region]
//     );

//     // 2. Send Email Notification
//     const mailOptions = {
//       from: `"RSV Groups Website" <${process.env.EMAIL_USER}>`,
//       to: process.env.EMAIL_TO,
//       subject: "New Site Inquiry - RSV Groups",
//       html: `
//         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #e0e0e0; border-radius: 10px;">
//           <h2 style="color: #F58220; margin-bottom: 5px;">RSV Groups</h2>
//           <p style="color: #666; margin-bottom: 25px;">New Site Inquiry Received</p>

//           <table style="width: 100%; border-collapse: collapse;">
//             <tr>
//               <td style="padding: 12px; background: #f9f9f9; font-weight: bold; width: 35%; border-radius: 5px;">Name</td>
//               <td style="padding: 12px;">${name}</td>
//             </tr>
//             <tr>
//               <td style="padding: 12px; background: #f9f9f9; font-weight: bold; border-radius: 5px;">Phone</td>
//               <td style="padding: 12px;">${phone}</td>
//             </tr>
//             <tr>
//               <td style="padding: 12px; background: #f9f9f9; font-weight: bold; border-radius: 5px;">Region</td>
//               <td style="padding: 12px;">${region}</td>
//             </tr>
//             <tr>
//               <td style="padding: 12px; background: #f9f9f9; font-weight: bold; border-radius: 5px;">Submitted At</td>
//               <td style="padding: 12px;">${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</td>
//             </tr>
//           </table>

//           <p style="margin-top: 25px; color: #999; font-size: 12px;">This is an automated email from RSV Groups website.</p>
//         </div>
//       `,
//     };

//     await transporter.sendMail(mailOptions);

//     res.status(201).json({
//       success: true,
//       message: "Inquiry saved and email sent successfully",
//       data: result.rows[0],
//     });

//   } catch (err) {
//     console.error("POST ERROR:", err);

//     res.status(500).json({
//       success: false,
//       message: "Failed to save inquiry",
//       error: err.message,
//     });
//   }
// });

// /*
// ====================================
// GET ALL SITE INQUIRIES
// GET /api/site-inquiries
// ====================================
// */
// router.get("/", async (req, res) => {
//   try {
//     const result = await pool.query(`
//       SELECT *
//       FROM site_inquiries
//       ORDER BY created_at DESC
//     `);

//     res.status(200).json(result.rows);

//   } catch (err) {
//     console.error("GET ERROR:", err);

//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch inquiries",
//       error: err.message,
//     });
//   }
// });

// /*
// ====================================
// DELETE SITE INQUIRY
// DELETE /api/site-inquiries/:id
// ====================================
// */
// router.delete("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;

//     const result = await pool.query(
//       `
//       DELETE FROM site_inquiries
//       WHERE id = $1
//       RETURNING *
//       `,
//       [id]
//     );

//     if (result.rowCount === 0) {
//       return res.status(404).json({
//         success: false,
//         message: "Inquiry not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Inquiry deleted successfully",
//       deleted: result.rows[0],
//     });

//   } catch (err) {
//     console.error("DELETE ERROR:", err);

//     res.status(500).json({
//       success: false,
//       message: "Failed to delete inquiry",
//       error: err.message,
//     });
//   }
// });

// module.exports = router;






const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const nodemailer = require("nodemailer");

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

    // 1. Save to DB
    const result = await pool.query(
      `INSERT INTO site_inquiries (name, phone, region)
       VALUES ($1, $2, $3) RETURNING *`,
      [name, phone, region]
    );

    // 2. Send Email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS.replace(/\s/g, ""), // spaces remove
      },
    });

    await transporter.sendMail({
      from: `"RSV Groups Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: "New Site Inquiry - RSV Groups",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <div style="background: #0f1a11; padding: 24px; text-align: center; border-radius: 8px 8px 0 0;">
            <h2 style="color: #F58220; margin: 0;">RSV Groups</h2>
            <p style="color: rgba(255,255,255,0.6); margin: 6px 0 0; font-size: 0.85rem;">New Site Inquiry Received</p>
          </div>
          <div style="padding: 30px; background: #fff;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px; background: #f9f9f9; font-weight: bold; width: 35%;">Name</td>
                <td style="padding: 12px;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 12px; background: #f9f9f9; font-weight: bold;">Phone</td>
                <td style="padding: 12px;">${phone}</td>
              </tr>
              <tr>
                <td style="padding: 12px; background: #f9f9f9; font-weight: bold;">Region</td>
                <td style="padding: 12px;">${region}</td>
              </tr>
              <tr>
                <td style="padding: 12px; background: #f9f9f9; font-weight: bold;">Submitted At</td>
                <td style="padding: 12px;">${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</td>
              </tr>
            </table>
          </div>
          <div style="background: #f9f7f4; padding: 16px; text-align: center; border-radius: 0 0 8px 8px;">
            <p style="margin: 0; font-size: 0.75rem; color: #aaa;">Automated email from RSV Groups Website</p>
          </div>
        </div>
      `,
    });

    res.status(201).json({
      success: true,
      message: "Inquiry saved and email sent successfully",
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
      SELECT * FROM site_inquiries ORDER BY created_at DESC
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
    const result = await pool.query(
      `DELETE FROM site_inquiries WHERE id = $1 RETURNING *`,
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
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./config/db');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const plotRoutes = require('./routes/plotRoutes');
const leadRoutes = require('./routes/leadRoutes');
const testimonialRoutes = require("./routes/testimonials");
const siteInquiryRoutes = require("./routes/siteInquiryRoutes");
const path = require("path");

app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads")
  )
);

app.use('/api/plots', plotRoutes);
app.use('/api/leads', leadRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/site-inquiries", siteInquiryRoutes);
app.use(express.json());

// ── Email / Inquiry Route ─────────────────────────────────────────────────────
app.post('/api/contact', async (req, res) => {
  const { name, phone, location, budget } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ success: false, message: 'Name and Phone are required.' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"RSV Groups Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // mpandiyan188@gmail.com
      subject: `New Inquiry from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 10px; overflow: hidden;">
          <div style="background: #0f1a11; padding: 24px; text-align: center;">
            <h2 style="color: #c9a84c; margin: 0; font-size: 1.5rem;">RSV Groups</h2>
            <p style="color: rgba(255,255,255,0.6); margin: 6px 0 0; font-size: 0.85rem;">New Customer Inquiry</p>
          </div>
          <div style="padding: 32px; background: #ffffff;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #888; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1px; width: 40%;">Full Name</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; font-weight: 700; color: #0f1a11;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #888; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1px;">Phone</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; font-weight: 700; color: #0f1a11;">${phone}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #888; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1px;">Preferred Location</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; font-weight: 700; color: #0f1a11;">${location}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; color: #888; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1px;">Investment Budget</td>
                <td style="padding: 12px 0; font-weight: 700; color: #c9a84c; font-size: 1.1rem;">${budget}</td>
              </tr>
            </table>
          </div>
          <div style="background: #f9f7f4; padding: 16px 32px; text-align: center;">
            <p style="margin: 0; font-size: 0.75rem; color: #aaa;">Received via RSV Groups Website Contact Form</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'Inquiry sent successfully!' });

  } catch (err) {
    console.error('Email error:', err);
    res.status(500).json({ success: false, message: 'Failed to send email. Try again.' });
  }
});
// ─────────────────────────────────────────────────────────────────────────────

app.get('/', (req, res) => {
  res.send('GreenField API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

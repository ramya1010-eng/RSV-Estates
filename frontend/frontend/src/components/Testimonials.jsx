import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const API = 'https://celebrated-flexibility-production-1c57.up.railway.app';

const Testimonials = ({ onNavigate }) => {
  const [reviews, setReviews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', role: '', review: '', image: null });
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await axios.get(`${API}/api/testimonials`);
      setReviews(res.data);
    } catch (error) {
      console.error('Error loading testimonials:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm(prev => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const data = new FormData();
      data.append('name', form.name);
      data.append('role', form.role);
      data.append('review', form.review);
      if (form.image) data.append('image', form.image);

      await axios.post(`${API}/api/testimonials`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setSubmitted(true);
      setForm({ name: '', role: '', review: '', image: null });
      setPreview(null);
      fetchTestimonials();
    } catch (err) {
      console.error('Submission error:', err);
      alert('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="testimonials" id="testimonials">
      <div className="container">

        <motion.div
          className="section-head"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: '5rem', justifyContent: 'center', textAlign: 'center', flexDirection: 'column', alignItems: 'center' }}
        >
          <div className="head-bar"></div>
          <p className="head-sub">VOICES OF TRUST</p>
          <h2 className="section-title serif">The Greenfield Experience</h2>
        </motion.div>

        <div className="testimonial-grid">
          {reviews.slice(0, 3).map((r) => (
            <motion.div
              key={r.id}
              className="testimonial-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Quote size={40} className="quote-icon" />
              <p className="testimonial-text">"{r.review}"</p>
              <div className="user-profile">
                <div className="profile-img">
                  <img
                    src={r.image_url ? `${API}${r.image_url}` : '/default-user.jpg'}
                    alt={r.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div className="user-info">
                  <h5 className="serif">{r.name}</h5>
                  <p>{r.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Buttons Row */}
        <div style={{ textAlign: 'center', marginTop: '3rem', display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <button className="book-btn" onClick={() => onNavigate('testimonials')}>
            View All Testimonials →
          </button>
          <button
            className="book-btn"
            onClick={() => { setShowForm(!showForm); setSubmitted(false); }}
            style={{ background: 'transparent', border: '2px solid #C9A84C', color: '#C9A84C' }}
          >
            {showForm ? 'Close Form' : '✍️ Write a Review'}
          </button>
        </div>

        {/* Review Form */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              marginTop: '3rem',
              background: '#0F2D1A',
              borderRadius: '16px',
              padding: '2.5rem',
              maxWidth: '600px',
              margin: '3rem auto 0',
              boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
            }}
          >
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
                <h3 style={{ color: '#C9A84C', fontFamily: 'serif', marginBottom: '0.5rem' }}>Thank You!</h3>
                <p style={{ color: 'rgba(255,255,255,0.7)' }}>Your review has been submitted successfully.</p>
                <button
                  onClick={() => { setSubmitted(false); setShowForm(false); }}
                  style={{ marginTop: '1.5rem', background: '#C9A84C', border: 'none', color: '#0F1A11', padding: '0.6rem 1.5rem', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                <h3 style={{ color: '#C9A84C', fontFamily: 'serif', marginBottom: '1.5rem', textAlign: 'center' }}>
                  Share Your Experience
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

                  {/* Name */}
                  <div>
                    <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>Full Name *</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      style={inputStyle}
                    />
                  </div>

                  {/* Role */}
                  <div>
                    <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>Role / Title *</label>
                    <input
                      name="role"
                      value={form.role}
                      onChange={handleChange}
                      required
                      placeholder="e.g. Home Buyer, Investor"
                      style={inputStyle}
                    />
                  </div>

                  {/* Review */}
                  <div>
                    <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>Your Review *</label>
                    <textarea
                      name="review"
                      value={form.review}
                      onChange={handleChange}
                      required
                      placeholder="Share your experience with RSV Estates..."
                      rows={4}
                      style={{ ...inputStyle, resize: 'vertical' }}
                    />
                  </div>

                  {/* Image Upload */}
                  <div>
                    <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>Profile Photo (optional)</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      {preview && (
                        <img src={preview} alt="preview" style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #C9A84C' }} />
                      )}
                      <label style={{ cursor: 'pointer', background: 'rgba(201,168,76,0.15)', border: '1px dashed #C9A84C', color: '#C9A84C', padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.85rem' }}>
                        📷 Choose Photo
                        <input type="file" accept="image/*" onChange={handleImage} style={{ display: 'none' }} />
                      </label>
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    onClick={handleSubmit}
                    disabled={submitting || !form.name || !form.role || !form.review}
                    style={{
                      marginTop: '0.5rem',
                      background: submitting ? 'rgba(201,168,76,0.5)' : '#C9A84C',
                      border: 'none',
                      color: '#0F1A11',
                      padding: '0.85rem',
                      borderRadius: '8px',
                      cursor: submitting ? 'not-allowed' : 'pointer',
                      fontWeight: '700',
                      fontSize: '1rem',
                      letterSpacing: '0.5px'
                    }}
                  >
                    {submitting ? 'Submitting...' : 'Submit Review'}
                  </button>
                </div>
              </>
            )}
          </motion.div>
        )}

      </div>
    </section>
  );
};

const inputStyle = {
  width: '100%',
  background: 'rgba(255,255,255,0.07)',
  border: '1px solid rgba(201,168,76,0.3)',
  borderRadius: '8px',
  padding: '0.75rem 1rem',
  color: '#ffffff',
  fontSize: '0.95rem',
  outline: 'none',
  boxSizing: 'border-box',
};

export default Testimonials;